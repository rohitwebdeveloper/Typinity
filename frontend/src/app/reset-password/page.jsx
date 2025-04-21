'use client'
import { useState, useEffect, useRef } from 'react';
import { emailRegex } from '@/utils/validation';
import axios from 'axios';
import axiosInstance from '@/utils/AxiosInstance';
import { toastSuccess, toastError } from '@/utils/toast';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {

  const [step, setStep] = useState(1);
  const [email, setemail] = useState('')
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, settimer] = useState(10)
  const intervalRef = useRef(null)
  const router = useRouter();
  const [loading, setloading] = useState(false)



  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!email) return toastError('Please Enter Email')

    if (!emailRegex.test(email)) return toastError('Invalid Email Format')
    setOtp('')
    try {
      setloading(true)
      const response = await axiosInstance.post('/api/auth/forgot-password', { email })
      console.log(response)
      if (response.status === 200) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setStep(2);
        settimer(10)
        toastSuccess(response.data.message)
        setloading(false)

        intervalRef.current = setInterval(() => {
          settimer((preval) => {
            if (preval <= 1) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
              return 0
            }
            return preval - 1
          })
        }, 1000);
      }
    } catch (error) {
      toastError(error?.response?.data?.message || 'Something went wrong!');
      setStep(1)
      setloading(false)
    }


  };


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) toastError('Enter OTP')

    try {
      setloading(true)
      const response = await axiosInstance.post('/api/auth/verify-otp', { email, otp })
      console.log(response)
      if (response.status === 200) {
        toastSuccess(response.data.message)
        setStep(3);
        setloading(false)
      }
    } catch (error) {
      toastError(error?.response?.data?.message || 'Something went wrong!')
      setloading(false)
    }
  };


  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toastError('Both passwords do not match');
      return;
    }
    try {
      setloading(true)
      const response = await axiosInstance.patch('/api/auth/reset-password', { email, confirmPassword })
      if (response.status === 200) {
        toastSuccess(response.data.message)
        router.push('/sign-in')
        setloading(false)
      }
    } catch (error) {
      console.log(error)
      toastError(error?.response?.data?.message || 'Something went wrong!')
      setloading(false)
    }
  };



  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Reset Password
        </h2>

        {step === 1 && (
          <div className="space-y-4 text-center">
            <p className="text-white text-left text-lg">Enter Your Registered Email</p>
            <p className="text-cyan-400 font-semibold text-lg">
              <input
                type="text"
                placeholder="Enter Email"
                className="w-full px-4 py-2 rounded-lg bg-[#334155] text-white placeholder-gray-400 font-normal focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </p>
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition"
            >
            {loading ? '...Processing' : 'Send OTP'}  
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 rounded-lg bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
            >
              {loading ? '...Verifying OTP' : 'Verify OTP'}  
            </button>
            <div className='flex justify-between items-center'>
              {timer !== 0 && <p className='text-white text-lg'>OTP is valid till:   {timer}.0  (sec)</p>}

              {timer === 0 && <button className='bg-cyan-400 hover:bg-cyan-500 outline-none py-1 px-2 rounded-md font font-semibold' onClick={handleSendOtp} >Resend OTP</button>}
            </div>

          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
            >
               {loading ? '...Processing' : 'Reset-Password'}  
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
