import { MYTRANSACTIONS_LOADING, MYTRANSACTIONS_SUCCESS, MYTRANSACTIONS_ERROR } from './../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function myTransactionsReducer (state = data, action){
    switch(action.type){
        case MYTRANSACTIONS_LOADING: 
            return {loading: true, data: null, error: null}
        case MYTRANSACTIONS_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case MYTRANSACTIONS_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default myTransactionsReducer