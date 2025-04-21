'use client'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import axiosInstance from '@/utils/AxiosInstance'
import { setAuthUser } from '@/lib/reducers/authSlice'


const AuthProvider = () => {

    const dispatch = useDispatch()
    const isAuthorised = useSelector((state) => state.auth.value)

    useEffect(() => {
        ; (async () => {
            if (isAuthorised !== null) {
                return
            }
            const response = await axiosInstance.get('/api/auth/check-auth', {withCredentials:true})
            console.log(response)
            if (response.status === 200 && response.data.success == true) {
                dispatch(setAuthUser(true))
            } else {
                dispatch(setAuthUser(false))
            }
        })()
    }, [])
    return null
}

export default AuthProvider