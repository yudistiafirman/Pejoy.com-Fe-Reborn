import { CHECKOUTSHIPPINGADDRESS_LOADING, CHECKOUTSHIPPINGADDRESS_SUCCESS, CHECKOUTSHIPPINGADDRESS_ERROR } from '../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function checkoutReducer (state = data, action){
    switch(action.type){
        case CHECKOUTSHIPPINGADDRESS_LOADING: 
            return {loading: true, data: null, error: null}
        case CHECKOUTSHIPPINGADDRESS_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case CHECKOUTSHIPPINGADDRESS_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default checkoutReducer