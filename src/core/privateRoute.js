import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {


    return (
        JSON.parse(localStorage.getItem("signUpFlag")) ? <Outlet /> : <Navigate to={"/signup"} />
    )
}

export default PrivateRoute