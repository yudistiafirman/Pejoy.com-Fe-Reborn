import { DELETE_CART_ERROR, DELETE_CART_LOADED, DELETE_CART_LOADING} from '../../Actions/Products/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function DeleteCartReducer (state = data, action){
    switch(action.type){
        case DELETE_CART_LOADING: 
            return {loading: true, data: null, error: null}
        case DELETE_CART_LOADED:
            return {loading: false, data: action.payload, error: null}
        case DELETE_CART_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default DeleteCartReducer