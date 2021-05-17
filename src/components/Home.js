import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Button, ButtonGroup, Container } from '@material-ui/core'
import Question from './Question';

class Home extends Component {
    constructor(props) {
        super(props);
        this.filterQuestions = this.filterQuestions.bind(this);

        this.state = {
            isAnswered : false,
            questionsToShow : this.filterQuestions(false)
        }
    }

    filterQuestions = (isAnswered) => {
        const { authedUser, questions, users} = this.props
        
        console.log('AuthedUser: ', authedUser )
        console.log('Questions: ', questions )

        const questionsArr = Object.values(questions);

        const sortedQuestions = questionsArr.sort((a, b) => b.timestamp - a.timestamp)

        const currentUser = users[authedUser.id];

        if(isAnswered) {
            return sortedQuestions.filter((question) => Object.keys(currentUser.answers).indexOf(question.id) !== -1);
        } else {
            return sortedQuestions.filter((question) => Object.keys(currentUser.answers).indexOf(question.id) === -1);
        }
    }

    render() {
        const { users, questions, authedUser } = this.props;
        const { isAnswered, questionsToShow } = this.state;
        
        
        return (
            <Container maxWidth="sm">
                <ButtonGroup size='large' variant='contained' fullWidth>
                    <Button color={this.state.isAnswered ? 'primary' : 'secondary'} onClick={()=> {
                        this.setState(() => ({
                            isAnswered: false,
                            questionsToShow: this.filterQuestions(false)
                        }))
                    }}>Un-Answered Questions</Button>
                    <Button color={this.state.isAnswered ? 'secondary' : 'primary'} onClick={()=> {
                        this.setState(() => ({
                            isAnswered: true,
                            questionsToShow: this.filterQuestions(true)
                        }))
                    }}>Answered Questions</Button>
                </ButtonGroup>
                {Object.values(questionsToShow).map((question) => {
                    return (
                        <Question key={question.id} authedUser={authedUser} question={question} users={users} isAnswered={isAnswered} viewType="list-view"/>
                    )}
                )}
            </Container>
        )
    }
}

function mapStateToProps({authedUser, users, questions}){
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Home)
