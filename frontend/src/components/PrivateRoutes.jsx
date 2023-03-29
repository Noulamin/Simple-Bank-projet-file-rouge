import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
import LoadingPage from './LoadingPage'

const PrivateRoutes = () => {

    const [isVerify, setIsVerify] = useState(null)
    const [IsLoading, setIsLoading] = useState(null)
    const token = Cookies.get('token')

    const verifyToken = async () => {

        axios.get('http://localhost:8080/api/auth/tokenVerification/' + token, { withCredentials: true }).then((res) => {

            if (res.status === 200) {
                // console.log(res.data)
                setIsVerify(true)
                setIsLoading(true)
            } else {
                setIsVerify(false)
                setIsLoading(true)
            }
        }).catch((error) => {
            console.log(error);
            setIsVerify(false)
            setIsLoading(true)
        })
    }

    useEffect(() => {
        if (token) {
            verifyToken()
        }
        else {
            setIsVerify(false)
            setIsLoading(true)
        }
    },[])

    return (
        <>
            {IsLoading ? <>
                {isVerify ? <Outlet /> : <Navigate to={"/login"} />}
            </> : <LoadingPage />}
        </>
    )
}

export default PrivateRoutes