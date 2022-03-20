import axios from 'axios'



export const sendOtp = async (body) => {
    return axios.post("http://15.206.92.254:3000/users/signup", body)
}

export const verifyEmail = async (body) => {
    return axios.post("http://15.206.92.254:3000/users/emailVerify", body)
}

export const getWord = async () => {
    return axios.get("http://15.206.92.254:3000/users/getWord")
}

export const updateUser = (body) => {
    return axios.post("http://15.206.92.254:3000/users/userStatus", body)
}

export const getUserDetails = (email) => {
    return axios.get(`http://15.206.92.254:3000/users/userDetails?email=${email}`)
}