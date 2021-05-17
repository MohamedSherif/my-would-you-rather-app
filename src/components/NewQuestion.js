import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Redirect, withRouter } from 'react-router-dom'

import { Button, Card, CardContent, CardHeader, Container, Divider, TextField, Typography } from '@material-ui/core'

import { handleAddQuestion } from '../actions/questions'
import { compose } from 'redux'


class NewQuestion extends Component {
    state = {
        optionOne : '',
        optionTwo: '',

        toHome: false,
        
        notify: {
            isOpen: false, 
            message: '', 
            type: ''
        }
    }

    handleOptionOneChange = (e) => {
        // const optionOne = e.target.value

        this.setState(() => ({
            optionOne: e.target.value
        }))
    }
    handleOptionTwoChange = (e) => {
        this.setState(() => ({
            optionTwo: e.target.value
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOne, optionTwo } = this.state
        const { dispatch, authedUser } = this.props
        // console.log('Option One', optionOne)
        // console.log('Option Two', optionTwo)
        dispatch(handleAddQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
        }, this.props.history));

        this.setState(() =>({
            optionOne: '',
            optionTwo: '',
            toHome: true
        }))
    }

    render() {
        const {optionOne, optionTwo, toHome} = this.state
        
        return (
            <Container maxWidth="sm" >
                <Card elevation={8} style={{margin: 10}}>
                    <CardHeader
                        title="Create New Question"
                    ></CardHeader>
                    <Divider />
                    <CardContent>
                        <Typography variant="subtitle1" color='textPrimary' >Complete the question</Typography>
                        <Typography variant="subtitle2" color='textSecondary' >Would you rather ...</Typography>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            id="outlined-option-one-input"
                            label="Option One"
                            variant="outlined"
                            style={{ 
                                // width: 300,
                                margin: '10px auto'
                            }}
                            onChange={this.handleOptionOneChange}
                            value={optionOne}
                            required
                            fullWidth
                            />
                            <Divider style={{margin : 10}}/>
                            <TextField
                            id="outlined-option-two-input"
                            label="Option Two"
                            variant="outlined"
                            style={{ 
                                // width: 300,
                                margin: '10px auto'
                            }}
                            onChange={this.handleOptionTwoChange}
                            value={optionTwo}
                            required
                            fullWidth
                            />
                            <Button 
                            type='submit' 
                            variant='contained' 
                            color='primary' 
                            disabled={!(optionOne !== undefined && optionOne.trim().length > 0) || !(optionTwo !== undefined && optionTwo.trim().length > 0)}
                            style={{ 
                                // width: 300,
                                margin: '10px auto'
                            }}
                            fullWidth >
                                Submit
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}

export default compose(withRouter, connect(mapStateToProps))(NewQuestion)