import ValidationComponent from "../components/validationComponent"

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