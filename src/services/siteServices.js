import axios from 'axios'



export const sendOtp = async (body) => {
    return axios.post("http://15.206.92.254:3000/users/signupStatus", body)
}
