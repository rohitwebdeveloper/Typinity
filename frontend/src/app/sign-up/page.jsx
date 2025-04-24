// app/signup/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import axiosInstance from '@/utils/AxiosInstance';
import { useRouter } from 'next/navigation';
import { emailRegex, passwordRegex } from '@/utils/validation';
import { toastSuccess, toastError } from '@/utils/toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/lib/reducers/authSlice';



const SignUp = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setloading] = useState(false)
  const [formData, setformData] = useState({
    fullname: '',
    email: '',
    password: ''
  })
  const [showhide, setshowhide] = useState(true)


  const handleOnchange = (event) => {
    const { value, name } = event.target;
    setformData((preval) => {
      return { ...preval, [name]: value }
    })
  }


  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.fullname || !formData.email || !formData.password) {
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
      const response = await axiosInstance.post('/api/auth/sign-up', formData, { withCredentials: true })
      console.log(response)
      if (response.status === 201) {
        toastSuccess('Sign-Up Successful')
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
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold sm:font-bold text-white text-center mb-6">
          Create Your Account 🚀
        </h2>

        <form className="space-y-5 " onSubmit={handleSubmitForm}>
          <div>
            <label className="block text-sm text-white mb-1">Name</label>
            <input
              type="text"
              name='fullname'
              value={formData.fullname}
              onChange={handleOnchange}
              placeholder=""
              className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              name='email'
              value={formData.email}
              onChange={handleOnchange}
              placeholder=""
              className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <div className="w-full flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">
              <input
                type={showhide ? 'password' : 'text'}
                name='password'
                value={formData.password}
                onChange={handleOnchange}
                placeholder=""
                className="w-full bg-transparent text-white outline-none"
              />
              <img src={showhide ? '/hide.png' : '/view.png'} alt="show/hide" onClick={() => setshowhide(!showhide)} className='filter invert h-7' />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white sm:font-semibold py-2 rounded-xl transition duration-300"
          >
            {loading ? '...Wait a moment' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-white text-center mt-6">
          Already have an account?
          <Link href="/sign-in" className="text-purple-400 hover:underline ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}


export default SignUp;