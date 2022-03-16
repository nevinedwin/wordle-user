import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { showValidation, validateEmail } from '../utilities/utils'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const navigate = useNavigate()

    const initialState = {
        email: "",
        otp: ""
    }

    const [input, setInput] = useState(initialState)
    const [sendOTP, setSendOTP] = useState(false)
    const [showOtp, setShowOtp] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSendOTP(true)
        console.log(sendOTP);
        if (sendOTP && input.email !== "" && validateEmail(input.email)) {
            console.log("send otp");
            setShowOtp(true)
            console.log(showOtp);
            setSendOTP(false)
        }
    }

    const handleSignUP = (e) => {
        e.preventDefault()
        console.log("signUp")
        setInput(initialState)
        setShowOtp(false)
        navigate('/game')

    }

    return (
        <div className='login-container'>
            <h3 className='text-deco'>InApp TechDay 2022..! </h3>
            <form onSubmit={e => showOtp ? handleSignUP(e) : handleSubmit(e)} className="login-form">
                {/* <h2 className='login-heading'>SignUp</h2> */}
                <h1><span class='one'>S</span><span class='two'>i</span><span class='three'>g</span><span class='four'>n</span> <span class='five'>U</span><span class='six'>p</span></h1>
                {sendOTP && input.email === "" && showValidation(true, "Email required")}
                {sendOTP && !validateEmail(input.email) && showValidation(true, "use inapp email")}
                <span className="p-float-label">
                    <InputText className='textField' id="email" name='email' value={input.email} onChange={(e) => handleChange(e)} />
                    <label htmlFor="email">Inapp Email</label>
                </span>
                {showOtp &&
                    <span className="p-float-label">
                        <InputText className='textField' id="otp" name='otp' value={input.otp} onChange={(e) => handleChange(e)} />
                        <label htmlFor="otp">Enter OTP</label>
                    </span>}
                {!showOtp && <Button className='otp-button' label="Get OTP" onClick={e => handleSubmit(e)} />}
                {showOtp && <Button className='otp-button' label="Sign Up" onClick={e => handleSignUP(e)} />}
            </form >
        </div>
    )
}

export default SignUp