// app/signin/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import axiosInstance from '@/utils/AxiosInstance';
import { useRouter } from 'next/navigation';
import { emailRegex, passwordRegex } from '@/utils/validation';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/lib/reducers/authSlice';
import { toastSuccess, toastError } from '@/utils/toast';

export default function SignIn() {

  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setloading] = useState(false)
  const [formData, setformData] = useState({
    email: '',
    password: ''
  })


  const handleOnchange = (event) => {
    const { value, name } = event.target;
    setformData((preval) => {
      return { ...preval, [name]: value }
    })
  }


  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toastError('Fill all the details')
      return
    }
    if (!emailRegex.test(formData.email)) {
      toastError('Invalid email format')
      return
    }
    if (!passwordRegex.test(formData.password)) {
      toastError('Password must be at least 8 characters, and include upper, lower, number, and special char.')
      return
    }

    try {
      setloading(true)
      const response = await axiosInstance.post('/api/auth/sign-in', formData)
      console.log(response)
      if (response.status === 200) {
        toastSuccess('Sign-In Successful')
        dispatch(setAuthUser(true))
        router.push('/')
        setloading(false)
      }
    } catch (error) {
      toastError(error?.response?.data?.message || 'Something went wrong!');
      setloading(false)
    }

  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-5" onSubmit={handleSubmitForm}>
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              name='email'
              onChange={handleOnchange}
              value={formData.email}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              name='password'
              onChange={handleOnchange}
              value={formData.password}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded-xl transition duration-300"
          >
           {loading ? '...Just a moment' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          <Link href="/reset-password" className="text-cyan-400 hover:underline ml-1">
         Forgot Password ?
          </Link>
        </p>
        <p className="text-sm text-white text-center mt-6">
          Don’t have an account?
          <Link href="/sign-up" className="text-cyan-400 hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
