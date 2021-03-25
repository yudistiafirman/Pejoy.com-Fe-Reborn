import { DATASTATISTIC_LOADING, DATASTATISTIC_SUCCESS, DATASTATISTIC_ERROR } from './../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function dataStatisticReducer (state = data, action){
    switch(action.type){
        case DATASTATISTIC_LOADING: 
            return {loading: true, data: null, error: null}
        case DATASTATISTIC_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case DATASTATISTIC_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default dataStatisticReducer