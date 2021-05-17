// import './App.css';
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'

import { handleInitialData } from '../actions/shared';

import Login from './login/login';
import Header from './Header';
import Home from './Home';
import NotFoundPage from './NotFoundPage';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import SingleQuesion from './SingleQuesion';

class App extends Component{
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, users } = this.props
    
    return (
        <Fragment>
          <LoadingBar />
          <Router >
            {authedUser !== null ? <Header authedUser={authedUser} dispatch={this.props.dispatch}/> : ''}
            <Switch>
              <Route path="/" exact>
                {authedUser !== null? <Home /> : <Login />}
              </Route>
              <Route path="/login" exact >
                {authedUser !== null? <Home /> : <Login />}
              </Route>
              <Route path="/home" exact >
                {authedUser !== null? <Home /> : <Login />}
              </Route>
              <Route path="/add" exact >
              {authedUser !== null? <NewQuestion /> : <Login />}
              </Route>
              <Route path="/leaderboard" exact >
              {authedUser !== null? <Leaderboard /> : <Login />}
              </Route>
              <Route path="/question/:id" exact render={(props) => {
                return this.props.authedUser !== null ? <SingleQuesion props={props} /> : <Login />
              }}/>
              <Route >
                {authedUser !== null? <NotFoundPage /> : <Login />}
              </Route>
            </Switch>
          </Router>
        </Fragment>
    );
  }
}

function PrivateRoute(props) {
  
  const { authedUser, children } = props

  return (
      <Route
          render={({ location }) => authedUser? ( 
            children
          ) : (
            <Redirect 
              to={{
                pathname: '/login'
              }}
            />
          )}
      />
  );
}

function mapStateToProps({authedUser, users}, {}){
  return {
      authedUser,
      users
  }
}

export default connect(mapStateToProps)(App);
