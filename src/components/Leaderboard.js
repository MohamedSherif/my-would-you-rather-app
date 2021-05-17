import React, { Component } from 'react'
import { Container } from '@material-ui/core'
import User from './User';
import { connect } from 'react-redux';

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.sortUsers = this.sortUsers.bind(this);
    }

    sortUsers = () => {
        const { users } = this.props;

        const usersArr = Object.values(users);

        return usersArr.sort((a, b) => (Object.values(b.answers).length + b.questions.length) - (Object.values(a.answers).length + a.questions.length));
    }

    render() {
        const { users } = this.props
        const usersToShow = this.sortUsers();
        return (
            <Container maxWidth="sm">
                {usersToShow.map((user) => (<User currentUser={user} key={user.id}/>))}
            </Container>
        );
    }
}

function mapStateToProps({authedUser, users, questions}){
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Leaderboard)