import { CART_LOADING, CART_LOADED, CART_ERROR} from '../../Actions/Products/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function cartReducer (state = data, action){
    switch(action.type){
        case CART_LOADING: 
            return {loading: true, data: null, error: null}
        case CART_LOADED:
            return {loading: false, data: action.payload, error: null}
        case CART_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default cartReducer