import Axios from 'axios';

import { ADD_CART_ERROR, ADD_CART_LOADED,  ADD_TRANSACTION_ERROR, ADD_TRANSACTION_LOADED, CART_ERROR, CART_LOADED, CART_LOADING, DELETE_CART_ERROR, DELETE_CART_LOADED, DELETE_CART_LOADING, UPDATE_CART_ERROR, UPDATE_CART_LOADED, UPDATE_CART_LOADING } from './ActionTypes';


export const getCartData = (token) => {
    return async(dispatch) => {
        dispatch({
            type: CART_LOADING
        })
        try {
            let res = await Axios.post(process.env.REACT_APP_API_URL + 'products/cart', {token : token})
                if(res.data.error){
                    dispatch({
                        type: CART_ERROR,
                        payload: res.data.message
                    })
                }else{
                    dispatch({
                        type: CART_LOADED,
                        payload: res.data.cartData
                    })
                }
        } catch (error) {
            dispatch({
                type: CART_ERROR,
                payload: error.message
            })
            
        }  
    }
}

export const updateQty = (data) => {
    return async(dispatch) => {
        dispatch({
            type : UPDATE_CART_LOADING
        })
        try {
            let res = await Axios.patch(process.env.REACT_APP_API_URL + 'products/cart/update-cart', data)
                if(res.data.error){
                    dispatch({
                        type : UPDATE_CART_ERROR,
                        payload : res.data.message
                    })
                }else{
                    dispatch({
                        type : UPDATE_CART_LOADED,
                        payload : res.data.message
                    })
                }
            
        } catch (error) {
            dispatch({
                type: UPDATE_CART_ERROR,
                payload: error.message
            })
            
        }
    }
}

export const deleteCart = (id) => {
    return(dispatch) => {
        dispatch({
            type : DELETE_CART_LOADING
        })

        Axios.delete(process.env.REACT_APP_API_URL + 'products/cart/delete-cart/' + id)
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type : DELETE_CART_ERROR,
                    payload : res.data.message
                })
            }else{
                dispatch({
                    type : DELETE_CART_LOADED,
                    payload : res.data.message
                })
            }
        })
        .catch((err) => {
            dispatch({
                type : DELETE_CART_ERROR,
                payload : err.message
            })
        })
    }
}

export const addCartSucces = (text) => {
    return{
        type : ADD_CART_LOADED,
        payload : text
    }
}

export const addCartGagal = (text) => {
    return{
        type : ADD_CART_ERROR,
        payload : text
    }
}

export const addTransactionSuccess = (text) => {
    return{
        type : ADD_TRANSACTION_LOADED,
        payload : text
    }
}

export const addTransactionGagal = (text) => {
    return{
        type : ADD_TRANSACTION_ERROR,
        payload : text
    }
}