import ValidationComponent from "../components/validationComponent"
const CryptoJS = require("crypto-js");

const secretKey = process.env.REACT_APP_SECRET_KEY;

export const showValidation = (isShow, message) => {
    return <ValidationComponent isShow={isShow} message={message} />
}

export const validateEmail = (email) => {
    if (email.indexOf('@') === -1) {
        return false
    }
    if (email.slice(email.indexOf('@'), email.length) === "@inapp.com") {
        return true
    }
    else {
        return false
    }
}


export const decodeHiddenWord = (encryptedWord) => {
    const bytes = CryptoJS.AES.decrypt(encryptedWord, secretKey).toString(CryptoJS.enc.Utf8);
    return bytes
}