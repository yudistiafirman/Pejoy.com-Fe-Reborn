import { FLASHSALEEVENT_LOADING, FLASHSALEEVENT_SUCCESS, FLASHSALEEVENT_ERROR } from '../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function flashSaleEventReducer (state = data, action){
    switch(action.type){
        case FLASHSALEEVENT_LOADING: 
            return {loading: true, data: null, error: null}
        case FLASHSALEEVENT_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case FLASHSALEEVENT_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default flashSaleEventReducer