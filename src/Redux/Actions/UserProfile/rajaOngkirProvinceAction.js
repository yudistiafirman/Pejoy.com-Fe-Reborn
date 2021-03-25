import Axios from 'axios';

import { RAJAONGKIRPROVINCE_LOADING, RAJAONGKIRPROVINCE_SUCCESS, RAJAONGKIRPROVINCE_ERROR } from './ActionTypes';

export const onGetProvinceIdRajaOngkir = () => {
    return (dispatch) => {
        dispatch({
            type: RAJAONGKIRPROVINCE_LOADING
        })

        Axios.get(process.env.REACT_APP_API_URL + 'member/shipping-address/get-raja-ongkir-province')
        .then((res) => {
            if(res.data.error){
                dispatch({
                    type: RAJAONGKIRPROVINCE_ERROR,
                    payload: res.data.message
                })
            }else{
                dispatch({
                    type: RAJAONGKIRPROVINCE_SUCCESS,
                    payload: res.data
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: RAJAONGKIRPROVINCE_ERROR,
                payload: err.message
            })
        })    
    }
}