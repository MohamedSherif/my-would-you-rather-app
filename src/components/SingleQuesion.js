import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

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
            <Question authedUser={authedUser} users={users} question={question} viewType='single-view' isAnswered={isAnswered} dispatch={this.props.dispatch} questionId={questionId}/>
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