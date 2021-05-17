export const SET_AUTHED_USED = 'SET_AUTHED_USED'
export const LOGOUT = 'LOGOUT'

export function setAuthedUser (user) {
    return {
        type : SET_AUTHED_USED,
        user,
    }
}

export function logout(){
    return{
        type : LOGOUT
    }
}