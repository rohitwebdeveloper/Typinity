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
  const [progressData, setprogressData] = useState([])
  const [loading, setloading] = useState(true)
  const [isError, setisError] = useState(false)
  const [range, setrange] = useState(0)
  const [userdetails, setuserdetails] = useState('')

  useEffect(() => {
    ; (async () => {
 
      try {
        setuserdetails(JSON.parse(sessionStorage.getItem('userdetails')))
        console.log('UserDetails', userdetails)
        let range = 0
        setloading(true)
        setisError(false)
        const response = await axiosInstance.get(`/api/typing/user?range=${range}`, { withCredentials: true })
        console.log(response)
        if (response.status === 200) {
          setprogressData(response.data.progress)

        }
      } catch (error) {
        if (error?.response?.status === 401) {
          toastError('You need to login first');
          router.push('/sign-in');
        } else {
          toastError(error?.response?.data?.message || 'Something went wrong!');
          setisError(true);
        }
      } finally {
        setloading(false)
      }
    })()
  }, [])

  
  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4 sm:px-6 md:px-10">
      <button onClick={() => router.push('/')} className="bg-cyan-400 rounded-full text-black px-3 text-sm sm:text-base py-1 hover:border-white hover:border"> ◀ Home</button>
      {loading && (<Loader />)}
      {isError && (<Error />)}
      {!loading && !isError && (
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold sm:font-bold text-center md:text-left mt-3 xl:mt-0 mb-6 text-cyan-400">My Account</h1>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* User Info Card */}
            <UserInfoCard user={progressData?.[0]?.user} userdetails={userdetails} />

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
