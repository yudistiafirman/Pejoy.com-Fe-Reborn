import { USERSTRANSACTIONS_LOADING, USERSTRANSACTIONS_SUCCESS, USERSTRANSACTIONS_ERROR } from '../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function usersTransactionsReducer (state = data, action){
    switch(action.type){
        case USERSTRANSACTIONS_LOADING: 
            return {loading: true, data: null, error: null}
        case USERSTRANSACTIONS_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case USERSTRANSACTIONS_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default usersTransactionsReducer