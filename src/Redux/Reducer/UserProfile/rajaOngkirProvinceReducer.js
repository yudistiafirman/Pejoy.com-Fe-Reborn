import { RAJAONGKIRPROVINCE_LOADING, RAJAONGKIRPROVINCE_SUCCESS, RAJAONGKIRPROVINCE_ERROR } from '../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function rajaOngkirProvinceReducer (state = data, action){
    switch(action.type){
        case RAJAONGKIRPROVINCE_LOADING: 
            return {loading: true, data: null, error: null}
        case RAJAONGKIRPROVINCE_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case RAJAONGKIRPROVINCE_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default rajaOngkirProvinceReducer