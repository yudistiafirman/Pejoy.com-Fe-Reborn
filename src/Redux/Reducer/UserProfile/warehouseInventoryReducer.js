import { WAREHOUSEINVENTORY_LOADING, WAREHOUSEINVENTORY_SUCCESS, WAREHOUSEINVENTORY_ERROR } from '../../Actions/UserProfile/ActionTypes';

const data = {
    loading: false,
    data: null,
    error: null
}

function warehouseInventoryReducer (state = data, action){
    switch(action.type){
        case WAREHOUSEINVENTORY_LOADING: 
            return {loading: true, data: null, error: null}
        case WAREHOUSEINVENTORY_SUCCESS:
            return {loading: false, data: action.payload, error: null}
        case WAREHOUSEINVENTORY_ERROR:
            return {...state, loading: false, error: action.payload}
        default: 
            return state
    }
}

export default warehouseInventoryReducer