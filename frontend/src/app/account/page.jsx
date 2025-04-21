'use client'
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Stats from "./_components/Stats";
import UserInfoCard from "./_components/UserInfoCard";
import ProgressChart from "./_components/ProgressChart";
import Setting from "./_components/Setting";
import axiosInstance from "@/utils/AxiosInstance";
import { toastSuccess, toastError } from "@/utils/toast";
import Loader from "@/components/Loader";
import Error from "@/components/Error";



const Account = () => {

  const router = useRouter();
  const isAuthorised = useSelector((state) => state.auth.value)
  const [progressData, setprogressData] = useState([])
  const [loading, setloading] = useState(true)
  const [isError, setisError] = useState(false)
  const [range, setrange] = useState(0)

  useEffect(() => {
    ; (async () => {
      if (!isAuthorised) {
        router.push('/sign-in')
        toastError('You need to login first')
        return
      }
      try {
        let range = 0
        setloading(true)
        setisError(false)
        const response = await axiosInstance.get(`/api/typing/user?range=${range}`, { withCredentials: true })
        console.log(response)
        if (response.status === 200) {
          setprogressData(response.data.progress)
          setloading(false)
        }
      } catch (error) {
        toastError(error?.response?.data?.message || 'Something went wrong!');
        setloading(false)
        setisError(true)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-6 sm:px-12">
      <button onClick={()=> router.push('/')} className="bg-cyan-400 rounded-full text-black px-3 py-1 hover:border-white hover:border"> ◀ Home</button>
      {loading && (<Loader />)}
      {isError && (<Error />)}
      {!loading && !isError && (
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-cyan-400">My Account</h1>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* User Info Card */}
            <UserInfoCard user={progressData?.[0]?.user} />

            {/* Latest Stats */}
            <Stats progressData={progressData} />
          </div>

          {/* Progress Chart */}
          <ProgressChart progressData={progressData} />

          {/* Settings Section */}
          <Setting />
        </div>
      )}
    </div>
  );
};

export default Account;
