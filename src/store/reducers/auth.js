import {AUTH_SUCCESS, AUTH_FAIL,AUTH_START, AUTO_LOGOUT} from "../action/actionTypes"

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:null
}

const authReducer = (state=initialState,action) =>{
    switch(action.type){
        case AUTH_START:
            return {
                ...state,
                loading:true,
                error:null
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                token:action.authData.idToken,
                userId:action.authData.localId,
                error:null,
                loading:false
            }
        case AUTH_FAIL:
            return {
                ...state,
                error:action.error.message,
                loading:false
            }
        case AUTO_LOGOUT:
            return {
                ...state,
                token:null,
                userId:null, 
                error:null
            }
        default:
            return state


    }
}
 export default authReducer