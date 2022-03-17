import React, { useContext, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { showValidation, validateEmail } from '../utilities/utils'
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../services/siteServices'
import { ManageLocalStorage } from '../services/manageLocalStorage'
import { ContextData } from '../context/context'

const SignUp = () => {

    const navigate = useNavigate()

    const { setSignUpFlag } = useContext(ContextData)

    const initialState = {
        email: "",
        otp: "",
        enteredOTP: "",
        signUpToken: ""
    }

    const [input, setInput] = useState(initialState)
    const [sendOTP, setSendOTP] = useState(false)
    const [showOtp, setShowOtp] = useState(false)
    const [signUp, setSignUp] = useState(false)

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
        if (sendOTP && input.email !== "" && validateEmail(input.email)) {
            console.log("send otp");
            sendOtp({ email: input.email }).then(res => {
                console.log(res.data.result)
                setInput(prev => ({
                    ...prev,
                    enteredOTP: res.data.result.otp,
                    signUpToken: res.data.result.token
                }))
            })
            setShowOtp(true)
            console.log(showOtp);
            setSendOTP(false)
        }
    }

    const handleSignUP = (e) => {
        e.preventDefault()
        setSignUp(true)
        if (input.otp === input.enteredOTP) {
            ManageLocalStorage.set("userToken", input.signUpToken)
            setSignUpFlag(true)
            console.log("signUp")
            setInput(initialState)
            setShowOtp(false)
            setSignUp(false)
            navigate('/game')
        } else {
            navigate('/signup')
        }

    }

    return (
        <div className='login-container'>
            <h3 className='text-deco'>InApp TechDay 2022..! </h3>
            <form onSubmit={e => showOtp ? handleSignUP(e) : handleSubmit(e)} className="login-form">
                <h1><span className='one'>S</span><span className='two'>i</span><span className='three'>g</span><span className='four'>n</span> <span className='five'>U</span><span className='six'>p</span></h1>
                {(sendOTP && input.email !== "" && input.email === "" && showValidation(true, "Email required")) || (sendOTP && !validateEmail(input.email) && showValidation(true, "use inapp email"))}
                <span className="p-float-label">
                    <InputText className='textField' id="email" name='email' value={input.email} onChange={(e) => handleChange(e)} />
                    <label htmlFor="email">Inapp Email</label>
                </span>
                {signUp && input.otp !== "" && input.otp !== input.enteredOTP && showValidation(true, "Wrong OTP")}
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