import Axios from 'axios';

import { DATASTATISTIC_LOADING, DATASTATISTIC_SUCCESS, DATASTATISTIC_ERROR } from './ActionTypes';

export const onGetDataStatistic = () => {
    return (dispatch) => {
        dispatch({
            type: DATASTATISTIC_LOADING
        })

        Axios.get(process.env.REACT_APP_API_URL + 'member/admin-dashboard/data-statistic')
        .then((res) => {
            console.log(res)
            if(res.data.error){
                dispatch({
                    type: DATASTATISTIC_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: DATASTATISTIC_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: DATASTATISTIC_ERROR,
                payload: err.message
            })
        })    
    }
}