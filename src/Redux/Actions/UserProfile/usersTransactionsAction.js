import Axios from 'axios';
import { UrlAPI } from '../../../Support/Constants/UrlAPI';
import { USERSTRANSACTIONS_LOADING, USERSTRANSACTIONS_SUCCESS, USERSTRANSACTIONS_ERROR } from './ActionTypes';

export const getUsersTransactions = (data) => {
    return (dispatch) => {
        dispatch({
            type: USERSTRANSACTIONS_LOADING
        })

        Axios.post(process.env.REACT_APP_API_URL + 'member/admin-dashboard/users-transaction/get-transactions', data)
        .then((res) => {
            console.log(res)
            if(res.data.error){
                dispatch({
                    type: USERSTRANSACTIONS_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: USERSTRANSACTIONS_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: USERSTRANSACTIONS_ERROR,
                payload: err.message
            })
        })    
    }
}

export const deliverProductsToCustomer = (data) => {
    return (dispatch) => {
        dispatch({
            type: USERSTRANSACTIONS_LOADING
        })

        Axios.post(UrlAPI + 'member/admin-dashboard/users-transaction/deliver-product', data)
        .then((res) => {
            console.log(res)
            if(res.data.error){
                dispatch({
                    type: USERSTRANSACTIONS_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: USERSTRANSACTIONS_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: USERSTRANSACTIONS_ERROR,
                payload: err.message
            })
        })    
    }
}