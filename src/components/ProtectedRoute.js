import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';

function ProtectedRoute(props) {
    const { component, authedUser, logout} = props;

    return (
        <Route render={(props) => {
            if(authedUser) {
                return <Component logout={logout}/>;
            } else {
                return (
                    <Redirect to={{pathname: "/", state: props.location}}/>
                );
            }
        } }/>
    );
}

export default ProtectedRoute;