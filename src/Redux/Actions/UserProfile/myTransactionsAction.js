import Axios from 'axios';

import { MYTRANSACTIONS_LOADING, MYTRANSACTIONS_SUCCESS, MYTRANSACTIONS_ERROR } from './ActionTypes';

export const getMyTransactions = (data) => {
    return (dispatch) => {
        dispatch({
            type: MYTRANSACTIONS_LOADING
        })

        Axios.post(process.env.REACT_APP_API_URL + 'member/transactions', data)
        .then((res) => {
          
            if(res.data.error){
                dispatch({
                    type: MYTRANSACTIONS_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: MYTRANSACTIONS_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: MYTRANSACTIONS_ERROR,
                payload: err.message
            })
        })    
    }
}

export const onExpiredTransaction = (dataUser, dataTransaction) => {
    return (dispatch) => {
        dispatch({
            type: MYTRANSACTIONS_LOADING
        })

        Axios.post(process.env.REACT_APP_API_URL + 'member/expired-transaction', dataTransaction)
        .then((res) => {
            console.log(res)
            if(res.data.error){
                dispatch({
                    type: MYTRANSACTIONS_ERROR,
                    payload: res.data.message
                })
            }else{
                Axios.post(process.env.REACT_APP_API_URL + 'member/transactions', dataUser)
                .then((res) => {
                    console.log(res.data)
                    if(res.data.error){
                        dispatch({
                            type: MYTRANSACTIONS_ERROR,
                            payload: res.data.message
                        })
                    }else{
                        dispatch({
                            type: MYTRANSACTIONS_SUCCESS,
                            payload: res.data
                        })
                    }
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: MYTRANSACTIONS_ERROR,
                payload: err.message
            })
        })    
    }
}

export const confirmMyTransaction = (data) => {
    return (dispatch) => {
        dispatch({
            type: MYTRANSACTIONS_LOADING
        })

        Axios.post(process.env.REACT_APP_API_URL + 'member/confirm-transaction', data)
        .then((res) => {
            console.log(res.data)
            if(res.data.error){
                dispatch({
                    type: MYTRANSACTIONS_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: MYTRANSACTIONS_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: MYTRANSACTIONS_ERROR,
                payload: err.message
            })
        })    
    }
}