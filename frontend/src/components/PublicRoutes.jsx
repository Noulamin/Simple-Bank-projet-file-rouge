import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';

const PublicRoutes = () => {

    const [isVerify, setIsVerify] = useState(null)
    const [CanCheck, setCanCheck] = useState(null)
    const token = Cookies.get('token')

    const verifyToken = async () => {

        axios.get('http://localhost:8080/api/auth/tokenVerification/' + token, { withCredentials: true }).then((res) => {

            if (res.status === 200) {
                setIsVerify(true)
                setCanCheck(true)
            } else {
                setIsVerify(false)
                setCanCheck(true)
            }
        }).catch((error) => {
            console.log(error);
            setIsVerify(false)
            setCanCheck(true)
        })
    }

    useEffect(() => {
        if (token) {
            verifyToken()
        }
        else {
            setIsVerify(false)
            setCanCheck(true)
        }
    }, [])

    return (
        <>
            {CanCheck ?
                <>
                    {!isVerify ? <Outlet /> : <Navigate to={"/dashboard"} />}
                </>
                :
                <>
                </>
            }
        </>
    )
}

export default PublicRoutes