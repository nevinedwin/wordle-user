import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { showValidation, validateEmail } from '../utilities/utils'
import { Navigate } from 'react-router'

const SignUp = () => {

    const initialState = {
        email: "",
        otp: ""
    }

    const [input, setInput] = useState(initialState)
    const [submitted, setSubmitted] = useState(false)
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
        setSubmitted(true)
        console.log(submitted);
        if (submitted && input.email !== "" && validateEmail(input.email)) {
            console.log("send otp");
            setShowOtp(true)
            console.log(showOtp);
            // setSubmitted(false)
            setInput(initialState)
        }
    }

    return (
        <div className='login-container'>
            <form onSubmit={e => handleSubmit(e)}>
                <h2 className='login-heading'>SignUp</h2>
                {submitted && input.email === "" && showValidation(true, "Email required")}
                {submitted && !validateEmail(input.email) && showValidation(true, "use inapp email")}
                <span className="p-float-label">
                    <InputText className='textField' id="email" name='email' value={input.email} onChange={(e) => handleChange(e)} />
                    <label htmlFor="email">Inapp Email</label>
                </span>
                {showOtp &&
                    <span className="p-float-label">
                        <InputText className='textField' id="otp" name='otp' value={input.otp} onChange={(e) => handleChange(e)} />
                        <label htmlFor="otp">Enter OTP</label>
                    </span>}
                <Button className='otp-button' label="Get OTP" onClick={e => handleSubmit(e)} />
            </form >
        </div>
    )
}

export default SignUp