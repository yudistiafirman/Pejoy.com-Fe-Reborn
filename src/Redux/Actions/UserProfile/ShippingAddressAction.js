import Axios from 'axios';
import { SHIPPINGADDRESS_LOADING, SHIPPINGADDRESS_SUCCESS, SHIPPINGADDRESS_ERROR } from './ActionTypes';

export const onSaveShippingAddress = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SHIPPINGADDRESS_LOADING
        })

        let res = await Axios.post(process.env.REACT_APP_API_URL + 'member/shipping-address/add-address', data)
        console.log(res)

        if(res.data.error){
            dispatch({
                type: SHIPPINGADDRESS_ERROR,
                payload: res.data.message
            })
        }else{
            dispatch({
                type: SHIPPINGADDRESS_SUCCESS,
                payload: res.data
            })
        }   
    }
}

export const onUpdateShippingAddress = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SHIPPINGADDRESS_LOADING
        })

        try {
            let res = await Axios.post(process.env.REACT_APP_API_URL + 'member/shipping-address/update-address', data)
            console.log(res)

            if(res.data.error){
                dispatch({
                    type: SHIPPINGADDRESS_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: SHIPPINGADDRESS_SUCCESS,
                    payload: res.data
                })
            }
        } catch (error) {
            dispatch({
                type: SHIPPINGADDRESS_ERROR,
                payload: error.message
            })
        }
    }
}

export const onDeleteShippingAddress = (data) => {
    return (dispatch) => {
        console.log(data)
        dispatch({
            type: SHIPPINGADDRESS_LOADING
        })

        Axios.delete(process.env.REACT_APP_API_URL + 'member/shipping-address/delete-address/' + data.token + '/' + data.address_id)
        .then((res) => {
            console.log(res)
            if(res.data.error){
                dispatch({
                    type: SHIPPINGADDRESS_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: SHIPPINGADDRESS_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: SHIPPINGADDRESS_ERROR,
                payload: err.message
            })
        })    
    }
}

export const getUsersShippingAddress = (token) => {
    return (dispatch) => {
        dispatch({
            type: SHIPPINGADDRESS_LOADING
        })

        Axios.post(process.env.REACT_APP_API_URL + 'member/shipping-address', {token})
        .then((res) => {
            console.log(res)
            if(res.data.error){
                dispatch({
                    type: SHIPPINGADDRESS_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: SHIPPINGADDRESS_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: SHIPPINGADDRESS_ERROR,
                payload: err.message
            })
        })    
    }
}