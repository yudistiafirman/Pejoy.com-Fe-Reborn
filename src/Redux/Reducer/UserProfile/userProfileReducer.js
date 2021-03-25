import { USERPROFILE_LOADING, USERPROFILE_SUCCESS, USERPROFILE_ERROR } from './../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function userProfileReducer (state = data, action){
    switch(action.type){
        case USERPROFILE_LOADING: 
            return {loading: true, data: null, error: null}
        case USERPROFILE_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case USERPROFILE_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default userProfileReducer