import {AUTH_SUCCESS,AUTH_FAIL,AUTH_START, AUTO_LOGOUT} from "./actionTypes"
import Axios from "axios"

export const authStart = () =>{
    return {
        type:AUTH_START
    }
}

export const authSuccess = (authData) =>{
    return {
        type:AUTH_SUCCESS,
        authData:authData
    }
} 
export const authFail = (error) =>{
    return {
        type:AUTH_FAIL,
        error:error
    }
}

export const autoLogout = (expirationTime) =>{
    return dispatch => {
        setTimeout(() =>{
            dispatch({type:AUTO_LOGOUT})

        }, expirationTime * 1000)
    }
}
export const auth = (email, password,baseURL) => {
    return dispatch => {
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        dispatch(authStart())
        Axios.post(baseURL,authData)
            .then(response =>{
                console.log(response)
                dispatch(authSuccess(response.data))
                dispatch(autoLogout(response.data.expiresIn))
        })
            .catch(error => {
            console.log(error)
            dispatch(authFail(error))
        })
    }
}