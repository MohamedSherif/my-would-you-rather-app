import { Avatar, Button, Typography } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

import { logout } from '../actions/authedUser'

export default function Header (props) {
  const { authedUser } = props
  console.log('Authed User:', authedUser)
  
  return (
    <nav>
      <div className="nav-container" >
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', padding:10}}>
          <NavLink to="/home" className="div-link">Home</NavLink>
          <NavLink to="/add" className="div-link">New Question</NavLink>
          <NavLink to="/leaderboard" className="div-link">Leaderboard</NavLink>
        </div>
        
        <div className="nav-user">
          <Typography align='center' color='textPrimary' >{`Welcome, ${authedUser.name}`}</Typography>
          <Avatar alt={authedUser.id} src={authedUser.avatarURL} style={{margin: '10px'}}/>
          <Button className="nav-button" onClick={() => props.dispatch(logout())}>Logout</Button>
        </div>
      </div>
    </nav>
  )
} 