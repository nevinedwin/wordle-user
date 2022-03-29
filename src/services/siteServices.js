import axios from 'axios'



export const sendOtpCall = async (body) => {
    return axios.post("http://15.206.92.254:3000/users/signup", body)
}

export const verifyEmail = async (body) => {
    return axios.post("http://15.206.92.254:3000/users/emailVerify", body)
}

export const getWord = async (date) => {
    return axios.get(`http://15.206.92.254:3000/users/getWord?date=${date}`)
}

export const updateUser = (body, token) => {
    return axios.post("http://15.206.92.254:3000/users/userStatus", body, {
        headers: { token }
    })
}

export const getUserDetails = (email, token) => {
    return axios.get(`http://15.206.92.254:3000/users/userDetails?email=${email}`, {
        headers: { token }
    })
}