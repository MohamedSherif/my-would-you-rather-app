import React, { Component } from 'react';
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

class Notifications extends Component {
    
    handleClose = (event, reason) => {
        const {notify, setNotify }  = this.props

        setNotify( false, notify.message, notify.type);
    }

    render() {
        const { notify } = this.props
        
        // console.log(notify)
        
        return (
            <Snackbar
                open={notify.isOpen}
                autoHideDuration={3000}
                onClose={this.handleClose}
            > 
                <Alert
                    onClose={this.handleClose}
                    severity={notify.type} 
                >
                    {notify.message}
                </Alert>
            </Snackbar>
        );
    }
}

export default Notifications;