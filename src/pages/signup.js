import React, { useContext, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { showValidation, validateEmail } from '../utilities/utils'
import { useNavigate } from 'react-router-dom'
import { getWord, sendOtp, verifyEmail } from '../services/siteServices'
import { ManageLocalStorage } from '../services/manageLocalStorage'
import { ContextData } from '../context/context'
import { toast } from 'react-toastify'

const SignUp = () => {

    const navigate = useNavigate()

    const { setSignUpFlag, setCurrentAttempt, setBoard, setGameOver, setEmail, setDisableLetters, setCorrectLetters, setAlmostLetters } = useContext(ContextData)

    const initialState = {
        email: "",
        otp: ""
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
        if (input.email !== "" && validateEmail(input.email)) {
            sendOtp({ email: input.email }).then(res => {
                localStorage.setItem("email", input.email)
                setEmail(input.email)
            })
            setShowOtp(true)
            setSendOTP(false)
        }
    }

    const handleSignUP = (e) => {
        e.preventDefault()
        setSignUp(true)
        verifyEmail({ email: input.email, otp: input.otp })
            .then(res => {
                const dateTime = new Date().toLocaleString("en-US", {
                    timeZone:
                        "Asia/Kolkata"
                });
                const date = dateTime.split(',')[0]
                getWord(date).then(resp => {
                    const { token, gameDetails } = res.data.result
                    ManageLocalStorage.set("userToken", token)
                    setCurrentAttempt(gameDetails.currAttempt)
                    setBoard(gameDetails.wordArray)
                    setGameOver(gameDetails.gameOver)
                    ManageLocalStorage.set("signUpFlag", true)
                    setSignUpFlag(true)
                    setInput(initialState)
                    setShowOtp(false)
                    setSignUp(false)
                    navigate('/game')
                }, error => {
                    localStorage.setItem('signUpFlag', false)
                    ManageLocalStorage.delete('email')
                    ManageLocalStorage.delete('userToken')
                    setDisableLetters([])
                    setCorrectLetters([])
                    setAlmostLetters([])
                    navigate('/signup')
                    setShowOtp(false)
                    setSignUp(false)
                    setSignUpFlag(false)
                    setInput(initialState)
                    toast.warn("Game Starts after 10 Am")
                })
            }, error => {
                toast.error("Wrong OTP")
            })
    }

    return (
        <div className='login-container'>
            <h3 className='text-deco'>InApp TechDay v17 </h3>
            <form onSubmit={e => showOtp ? handleSignUP(e) : handleSubmit(e)} className="login-form">
                <h1><span className='one'>S</span><span className='two'>i</span><span className='three'>g</span><span className='four'>n</span> <span className='five'>U</span><span className='six'>p</span></h1>
                {(sendOTP && input.email !== "" && input.email === "" && showValidation(true, "Email required")) || (sendOTP && !validateEmail(input.email) && showValidation(true, "use inapp email"))}
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