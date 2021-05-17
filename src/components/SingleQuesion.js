import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

import NotFoundPage from './NotFoundPage'

class SingleQuesion extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            authedUser,
            users,
            question,
            viewType,
            questionId
        } = this.props;

        const currentUser = users[authedUser.id];
        
        let isAnswered = false;
        if (Object.keys(currentUser.answers).includes(questionId)) {
            isAnswered = true;
        }

        return (
            <div>
                {question === null || question === undefined? <NotFoundPage /> : <Question authedUser={authedUser} users={users} question={question} viewType='single-view' isAnswered={isAnswered} dispatch={this.props.dispatch} questionId={questionId}/>}
            </div>
        );
    }
}

function mapStateToProps({ authedUser, users, questions }, props){
    return {
        authedUser,
        users,
        question: questions[props.props.match.params.id],
        viewType: props.viewType,
        questionId: props.props.match.params.id
    }
}

export default connect(mapStateToProps)(SingleQuesion);