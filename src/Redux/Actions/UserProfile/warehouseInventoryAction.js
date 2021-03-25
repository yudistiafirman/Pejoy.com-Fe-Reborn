import Axios from 'axios';

import { WAREHOUSEINVENTORY_LOADING, WAREHOUSEINVENTORY_SUCCESS, WAREHOUSEINVENTORY_ERROR } from './ActionTypes';

export const getWarehouseInventory = () => {
    return (dispatch) => {
        dispatch({
            type: WAREHOUSEINVENTORY_LOADING
        })

        Axios.get(process.env.REACT_APP_API_URL + 'member/admin-dashboard/warehouse-inventory')
        .then((res) => {
            console.log(res.data)
            if(res.data.error){
                dispatch({
                    type: WAREHOUSEINVENTORY_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: WAREHOUSEINVENTORY_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: WAREHOUSEINVENTORY_ERROR,
                payload: err.message
            })
        })    
    }
}