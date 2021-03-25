import { RAJAONGKIRCITY_LOADING, RAJAONGKIRCITY_SUCCESS, RAJAONGKIRCITY_ERROR } from '../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function rajaOngkirCityReducer (state = data, action){
    switch(action.type){
        case RAJAONGKIRCITY_LOADING: 
            return {loading: true, data: null, error: null}
        case RAJAONGKIRCITY_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case RAJAONGKIRCITY_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default rajaOngkirCityReducer