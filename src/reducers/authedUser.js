import { SET_AUTHED_USED, LOGOUT } from '../actions/authedUser'

export default function authedUser (state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USED : 
            return action.user
        case LOGOUT :
            return null;
        default :
            return state
    }
}