import React from 'react'
import axios from 'axios'
import { toastSuccess, toastError } from '@/utils/toast'
import { useDispatch } from 'react-redux'
import { clearAuthUser } from '@/lib/reducers/authSlice'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/utils/AxiosInstance'

const Setting = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const handleDeleteAccount = async () => {
    try {
      const response = await axiosInstance.delete('/api/auth/delete-account', {withCredentials:true})
      if(response.status === 200) {
         toastSuccess(response.data.message)
         dispatch(clearAuthUser())
         router.push('/sign-in')
      }
    } catch (error) {
      toastError(error?.response?.data?.message || 'Something went wrong')
    } 
  }


  const handleLogout = () => {
    dispatch(clearAuthUser())
    router.push('/sign-in')
  }
  

    return (
        <div className="mt-10 bg-[#1e293b] p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-white">Settings</h2>
        <p className="text-gray-400 mb-4">Log out, and delete your account.</p>
      
        <div className="flex flex-col w-fit gap-3">
          {/* <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg  text-white">
            Change Password
          </button> */}
      
          <button onClick={handleLogout} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 transition-colors rounded-lg  text-white">
            Log Out
          </button>
      
          <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded-lg  text-white">
            Delete Account
          </button>
        </div>
      </div>
      
    )
}

export default Setting