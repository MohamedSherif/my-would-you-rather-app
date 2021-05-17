import React from 'react';
import { withRouter } from 'react-router-dom';

import { Avatar, Button, Card, CardContent, CardHeader, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(12),
      margin: 'auto'
    },
    cardStyle: {
        margin: 10
    },

  }));

function User(props) {
    // const { question, users, currentUser } = props.location.state? props.location.state : props
    const { question, users, currentUser } = props

    const classes = useStyles();
    const numOfQuestions = currentUser.questions.length;
    const numOfAnswers = Object.values(currentUser.answers).length;

    const score = numOfQuestions + numOfAnswers;

    return (
        <Container maxWidth="sm" key={currentUser.id}>
            <Card key={currentUser.id} elevation={8} className={classes.cardStyle}>
                <CardHeader 
                    title={`${currentUser.name}`}
                >
                </CardHeader>
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Avatar alt={currentUser.id} src={currentUser.avatarURL} className={classes.large}/>
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical"/>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' color='textPrimary' style={{margin: 10}}>{`Asked: ${numOfQuestions}`}</Typography>
                            <Divider />
                            <Typography variant='subtitle1' color='textPrimary' style={{margin: 10}}>{`Answered: ${numOfAnswers}`}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical"/>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography variant='subtitle2' color='textPrimary' style={{margin: 'auto'}}>Score</Typography>
                            <Typography variant='subtitle1' color='textPrimary' style={{margin: 10}}>{score}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        
    );
}

export default withRouter(User);