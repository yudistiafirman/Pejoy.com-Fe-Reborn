import Axios from 'axios';

import { FLASHSALE_LOADING, FLASHSALE_SUCCESS, FLASHSALE_ERROR } from './ActionTypes';

export const getFlashSaleProducts = () => {
    return (dispatch) => {
        dispatch({
            type: FLASHSALE_LOADING
        })

        Axios.get(process.env.REACT_APP_API_URL + 'products-flash-sale')
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type: FLASHSALE_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: FLASHSALE_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: FLASHSALE_ERROR,
                payload: err.message
            })
        })    
    }
}