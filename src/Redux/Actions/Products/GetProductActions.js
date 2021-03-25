import axios from 'axios'
import { GET_ALL_PRODUCT_ERROR, GET_ALL_PRODUCT_LOADED, GET_ALL_PRODUCT_LOADING } from './ActionTypes'


export const GetAllProduct=()=>{
    return (dispatch)=>{
        
        dispatch({
            type:GET_ALL_PRODUCT_LOADING
        })

        axios.get(process.env.REACT_APP_API_URL+'products/products').then((response)=>{

            dispatch({
                type:GET_ALL_PRODUCT_LOADED,
                payload:response.data.products
            })
        }).catch((error)=>{
            dispatch({
                type:GET_ALL_PRODUCT_ERROR,
                payload:error.message
            })
        })

    }
}