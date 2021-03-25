import Axios from 'axios';

import { USERPROFILE_LOADING, USERPROFILE_SUCCESS, USERPROFILE_ERROR } from './ActionTypes';

export const onGetDataUsers = (token) => {
    return (dispatch) => {
        dispatch({
            type: USERPROFILE_LOADING
        })

        Axios.post(process.env.REACT_APP_API_URL + 'member/profile', {token})
        .then((res) => {
  
            if(res.data.error){
                dispatch({
                    type: USERPROFILE_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: USERPROFILE_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: USERPROFILE_ERROR,
                payload: err.message
            })
        })    
    }
}