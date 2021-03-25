import { BESTSELLERPRODUCTS_LOADING, BESTSELLERPRODUCTS_SUCCESS, BESTSELLERPRODUCTS_ERROR } from '../../Actions/LandingPage/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function bestSellerProductsReducer (state = data, action){
    switch(action.type){
        case BESTSELLERPRODUCTS_LOADING: 
            return {loading: true, data: null, error: null}
        case BESTSELLERPRODUCTS_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case BESTSELLERPRODUCTS_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default bestSellerProductsReducer