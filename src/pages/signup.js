import React, { useContext, useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { showValidation, validateEmail } from '../utilities/utils'
import { useNavigate } from 'react-router-dom'
import { sendOtp, verifyEmail } from '../services/siteServices'
import { ManageLocalStorage } from '../services/manageLocalStorage'
import { ContextData } from '../context/context'

const SignUp = () => {

    const navigate = useNavigate()

    const { setSignUpFlag, setCurrentAttempt, setBoard, setGameOver, setEmail, signUpFlag } = useContext(ContextData)

    const initialState = {
        email: "",
        otp: "",
        otpError: false
    }

    const [input, setInput] = useState(initialState)
    const [sendOTP, setSendOTP] = useState(false)
    const [showOtp, setShowOtp] = useState(false)
    const [signUp, setSignUp] = useState(false)

    // useEffect(() => {
    //     !showOtp && ManageLocalStorage.delete("email")
    //     !signUpFlag && ManageLocalStorage.delete("userToken")
    // }, [showOtp, signUpFlag])

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
                ManageLocalStorage.set("email", input.email)
                setEmail(input.email)
            })
            setShowOtp(true)
            console.log(showOtp);
            setSendOTP(false)
        }
    }

    const handleSignUP = (e) => {
        e.preventDefault()
        setSignUp(true)
        verifyEmail({ email: input.email, otp: input.otp })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    if (res.data.success) {
                        const { token, gameDetails } = res.data.result
                        ManageLocalStorage.set("userToken", token)
                        setCurrentAttempt(gameDetails.currAttempt)
                        setBoard(gameDetails.wordArray)
                        setGameOver(gameDetails.gameOver)
                        setSignUpFlag(true)
                        console.log("signUp")
                        setInput(initialState)
                        setShowOtp(false)
                        setSignUp(false)
                        navigate('/game')
                    } else {
                        setInput(prev => ({
                            ...prev,
                            otpError: true
                        }))
                        navigate('/signup')
                    }
                }
                else if (res.status === 401) {
                    setInput(prev => ({
                        ...prev,
                        otpError: true
                    }))
                    navigate('/signup')
                }
                else {
                    console.log("........", res.status);
                    navigate('/signup')
                }
            })

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
                {signUp && input.otp !== "" && input.otpError && showValidation(true, "Wrong OTP")}
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