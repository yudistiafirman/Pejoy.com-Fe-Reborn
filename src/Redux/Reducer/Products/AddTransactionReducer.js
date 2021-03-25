import { ADD_TRANSACTION_ERROR, ADD_TRANSACTION_LOADED, ADD_TRANSACTION_LOADING} from '../../Actions/Products/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function AddCartReducer (state = data, action){
    switch(action.type){
        case ADD_TRANSACTION_LOADING: 
            return {loading: true, data: null, error: null}
        case ADD_TRANSACTION_LOADED:
            return {loading: false, data: action.payload, error: null}
        case ADD_TRANSACTION_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default AddCartReducer