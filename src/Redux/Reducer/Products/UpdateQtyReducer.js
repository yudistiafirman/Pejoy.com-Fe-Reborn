  
import { UPDATE_CART_LOADING, UPDATE_CART_ERROR, UPDATE_CART_LOADED} from '../../Actions/Products/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function UpdateQtyReducer (state = data, action){
    switch(action.type){
        case UPDATE_CART_LOADING: 
            return {loading: true, data: null, error: null}
        case UPDATE_CART_LOADED:
            return {loading: false, data: action.payload, error: null}
        case UPDATE_CART_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default UpdateQtyReducer
