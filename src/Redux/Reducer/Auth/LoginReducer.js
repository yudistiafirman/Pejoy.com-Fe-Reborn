import { LOGIN_ERROR, LOGIN_SUCCESS } from "../../Actions/Auth/ActionTypes"

const data = {
    data: null,
    error: null
}

function LoginReducer (state = data, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {data: action.payload, error: null}
        case LOGIN_ERROR:
            return {...state, error: action.payload}
        default: 
            return state
    }
}

export default LoginReducer