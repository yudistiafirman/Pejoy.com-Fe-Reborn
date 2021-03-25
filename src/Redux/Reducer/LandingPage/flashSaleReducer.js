import { FLASHSALE_LOADING, FLASHSALE_SUCCESS, FLASHSALE_ERROR } from '../../Actions/LandingPage/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function flashSaleReducer (state = data, action){
    switch(action.type){
        case FLASHSALE_LOADING: 
            return {loading: true, data: null, error: null}
        case FLASHSALE_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case FLASHSALE_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default flashSaleReducer