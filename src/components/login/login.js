import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Paper, Avatar, TextField, Button, Container } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { LockOutlined } from '@material-ui/icons'

import { setAuthedUser } from '../../actions/authedUser'
import Notifications from '../Notifications'
 
class Login extends Component {
    state = {
        username : '',
        password: '',
        
        notify: {
            isOpen: false, 
            message: '', 
            type: ''
        }
    }

    setNotify = (isOpen, message, type) => {
        this.setState( {
            notify : { 
                isOpen, 
                message, 
                type
            }
        })
    }

    handleUsernameChange = (e, values) => {
        console.log('Event Value: ', e.target.value)
        console.log('Values: ', values)

        this.setState(() => ({
            username: values? values.id : ''
        }))
    }
    handlePasswordChange = (e) => {
        const password = e.target.value

        this.setState(() => ({
            password
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;
        const { dispatch, users } = this.props;
        
        if(users[username].password === password) {
            console.log('Authorized')
            dispatch(setAuthedUser(users[username]));

            this.setNotify (true, 'Signed In Successfully! ', 'success')

        } else {
            console.log('Not Authorized')
            
            this.setNotify (true, 'Authentication Error, Wrong Passwrod! ', 'error')
        }
    }

    render() {
        const { users } = this.props
        const { username, password } = this.state
        
        const paperStyle = {
            padding: 20,
            height: '70vh',
            margin: '20px auto'
        }
        const avatarStyle = {
            backgroundColor: '#de7bbb'
        }
        return (
            <Container maxWidth="sm" >
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlined /></Avatar>
                    Sign In
                    <form onSubmit={this.handleSubmit}>
                    <Autocomplete
                    id="users-select"
                    style={{ 
                        width: 300,
                        padding: 10,
                        margin: '10px auto'
                    }}
                    options={Object.values(users)}
                    onChange={this.handleUsernameChange}
                    // classes={{
                    //     option: classes.option,
                    // }}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(option) => (
                        <React.Fragment>
                            <Avatar alt={option.id} src={option.avatarURL} style={{margin: '10px'}}/>
                            {option.name}
                        </React.Fragment>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Choose a User"
                        variant="outlined"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        required
                        />
                    )}
                    />
                    {/* <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    style={{ 
                        width: 300,
                        padding: 10,
                        margin: '10px auto'
                    }}
                    onChange={this.handlePasswordChange}
                    required
                    /> */}
                    <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    style={{ 
                        width: 300,
                        margin: '10px auto'
                    }}
                    onChange={this.handlePasswordChange}
                    required
                    />
                    <Button 
                    type='submit' 
                    variant='contained' 
                    color='primary' 
                    disabled={username === '' || password === ''}
                    style={{ 
                        // width: 300,
                        margin: '10px auto'
                    }}
                    fullWidth >
                        Sign In
                    </Button>
                    </form>
                    <Notifications 
                        notify={this.state.notify}
                        setNotify = {this.setNotify} 
                    />
                    </Grid>
                </Paper>
            </Container>
        )
    }
}


function mapStateToProps({users}){
    return {
        users : users
    }
}
export default connect(mapStateToProps)(Login)