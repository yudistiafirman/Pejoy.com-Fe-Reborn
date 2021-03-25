import Axios from 'axios';

import { FLASHSALEEVENT_LOADING, FLASHSALEEVENT_SUCCESS, FLASHSALEEVENT_ERROR } from './ActionTypes';

export const getAllDiscountProducts = () => {
    return (dispatch) => {
        dispatch({
            type: FLASHSALEEVENT_LOADING
        })

        Axios.get(process.env.REACT_APP_API_URL + 'member/admin-dashboard/flash-sale/get-products-discount')
        .then((res) => {
            console.log(res.data)
            if(res.data.error){
                dispatch({
                    type: FLASHSALEEVENT_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: FLASHSALEEVENT_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: FLASHSALEEVENT_ERROR,
                payload: err.message
            })
        })    
    }
}

export const createFlashSaleEvent = (data) => {
    return (dispatch) => {
        dispatch({
            type: FLASHSALEEVENT_LOADING
        })

        Axios.post(process.env.REACT_APP_API_URL + 'member/admin-dashboard/flash-sale/create-flash-sale-event', data)
        .then((res) => {
            console.log(res)
            if(res.data.error){
                dispatch({
                    type: FLASHSALEEVENT_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: FLASHSALEEVENT_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: FLASHSALEEVENT_ERROR,
                payload: err.message
            })
        })    
    }
}