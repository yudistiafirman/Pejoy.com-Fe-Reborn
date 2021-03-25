import { GET_ALL_PRODUCT_ERROR, GET_ALL_PRODUCT_LOADED, GET_ALL_PRODUCT_LOADING } from "../../Actions/Products/ActionTypes"


const data={
    loading:false,
    error:false,
    data:null
}


export function GetProductsReducer(state=data,action){
    switch(action.type){
        case GET_ALL_PRODUCT_LOADING: 
        return {loading: true, data: null, error: null}
        case GET_ALL_PRODUCT_LOADED:
        return {loading: false, data: action.payload, error: null}
    case GET_ALL_PRODUCT_ERROR:
        return {...state, loading: false, error: action.payload}
    default: 
        return state

    }
}