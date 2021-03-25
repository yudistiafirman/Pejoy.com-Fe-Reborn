import { LOGIN_ERROR, LOGIN_SUCCESS } from "./ActionTypes"

export const loginSuccess = (text) => {
    return{
        type : LOGIN_SUCCESS,
        payload : text
    }
}

export const loginGagal = (text) => {
    return{
        type : LOGIN_ERROR,
        payload : text
    }
}