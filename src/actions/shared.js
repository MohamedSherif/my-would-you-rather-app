import { getInitialData } from '../utils/api'

import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

// const AUTHED_USER_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
        .then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(hideLoading());
        })
    }

    
}