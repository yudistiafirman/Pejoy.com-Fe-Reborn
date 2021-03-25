import { SHIPPINGADDRESS_LOADING, SHIPPINGADDRESS_SUCCESS, SHIPPINGADDRESS_ERROR } from './../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function shippingAddressReducer (state = data, action){
    switch(action.type){
        case SHIPPINGADDRESS_LOADING: 
            return {loading: true, data: null, error: null}
        case SHIPPINGADDRESS_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case SHIPPINGADDRESS_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default shippingAddressReducer