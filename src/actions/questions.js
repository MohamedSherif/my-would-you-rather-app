import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'

import { handleInitialData } from '../actions/shared'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receiveQuestions(questions) {
    return {
        type : RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion ( question ) {
    return {
        type : ADD_QUESTION,
        question
    }
}

export function handleAddQuestion( question, history ) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const { optionOneText, optionTwoText } = question
        //todo : dipatch show Loading
        dispatch(showLoading());
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author : authedUser.id
        })
        .then((question) => {
            dispatch(addQuestion(question));
            dispatch(handleInitialData());
            dispatch(hideLoading());
        }).then(() => {
            history.push('/');
        })
        
        //todo : dipatch hide Loading
    }
}

function addQuestionAnswer (questionAnswer) {
    return {
        type : SAVE_QUESTION_ANSWER,
        questionAnswer
    }
}

export function handleSaveQuestionAnswer (questionAnswer, history ) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const { qid, answer} = questionAnswer
        
        dispatch(showLoading());
        
        return saveQuestionAnswer({
            authedUser: authedUser.id,
            qid,
            answer
        }).then((questionAnswer) => {
            dispatch(handleInitialData());
            dispatch(hideLoading());
        }).then(() => {
            history.push('/question/' + qid);
        })
    }
}

