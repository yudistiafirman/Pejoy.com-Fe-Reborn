import { ADD_CART_ERROR, ADD_CART_LOADED, ADD_CART_LOADING} from '../../Actions/Products/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function AddCartReducer (state = data, action){
    switch(action.type){
        case ADD_CART_LOADING: 
            return {loading: true, data: null, error: null}
        case ADD_CART_LOADED:
            return {loading: false, data: action.payload,error:null}
        case ADD_CART_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default AddCartReducer