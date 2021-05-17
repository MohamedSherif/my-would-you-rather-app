import React, { useState } from 'react';
import { Link, Redirect, useLocation, withRouter } from 'react-router-dom';

import { 
    Avatar, 
    Box, 
    Button, 
    Card, 
    CardContent, 
    CardHeader, 
    Container, 
    Divider, 
    FormControlLabel, 
    Grid, 
    LinearProgress, 
    makeStyles, 
    Radio, 
    RadioGroup, 
    Typography } from '@material-ui/core';

import { handleSaveQuestionAnswer } from '../actions/questions'
import { connect } from 'react-redux';
import { compose } from 'redux';

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

function Question(props) {
    const location = useLocation();

    const { authedUser, question, users, viewType, isAnswered, dispatch, questionId} = props

    console.log('isAnswered: ', isAnswered)

    const classes = useStyles();

    const authorUser = users[question.author];
    
    const currentUser = users[authedUser.id];
    
    const [value, setValue] = useState('');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleSaveQuestionAnswer({
            qid: question.id, 
            answer: value
        }, props.history))
    }

    let optionOneAnswers = question.optionOne.votes.length;
    let optionTwoAnswers = question.optionTwo.votes.length;

    let totalAnswers = optionOneAnswers + optionTwoAnswers;

    let optionOnePercentage = 0;
    let optionTwoPercentage = 0;

    if(totalAnswers>0){
        optionOnePercentage = Math.round((optionOneAnswers*100)/totalAnswers);
        optionTwoPercentage = Math.round((optionTwoAnswers*100)/totalAnswers);
    }

    let selectedAnswer = null;

    return (
        <Container maxWidth="sm" key={question.id}>
            <Card key={question.id} elevation={8} className={classes.cardStyle}>
                <CardHeader 
                    title={`${authorUser.name} asks:`}
                >
                </CardHeader>
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Avatar alt={authorUser.id} src={authorUser.avatarURL} className={classes.large}/>
                        </Grid>
                        <Grid item xs={1}>
                            <Divider orientation="vertical"/>
                        </Grid>
                        <Grid item xs={8}>
                            {viewType === 'list-view'
                            ? (<div>
                                    <Typography variant='subtitle1' color='textPrimary' style={{margin: 10}}>Would you rather</Typography>
                                    <Typography variant='subtitle2' color='textPrimary' style={{margin: 10}}>{`...${question.optionOne.text}...`}</Typography>
                                    <Link to={'/question/'+question.id} className="btn btn-primary">View Poll</Link>
                                </div>)
                            : !isAnswered
                            ? (
                            <form onSubmit={handleSubmit}>
                                <RadioGroup aria-label="quiz" name="quiz" onChange={handleRadioChange}>
                                    <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
                                    <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
                                </RadioGroup>
                                <Button type="submit" variant="outlined" color="primary" fullWidth>
                                    Vote
                                </Button>
                            </form>)
                            : 
                            <div>
                                <Typography variant="subtitle1" style={{ textAlign: 'left' }}>Results:</Typography>
                                <div style={currentUser.answers[question.id]==='optionOne'?{backgroundColor:'#3dcfa5'}:{}}>
                                    <Typography variant="subtitle2"> Would you rather {question.optionOne.text} </Typography>
                                    <Box display="flex" alignItems="center">
                                        <Box width="100%" mr={1}>
                                            <LinearProgress variant="determinate" value={optionOnePercentage} />
                                        </Box>
                                        <Box minWidth={40}>
                                            <Typography variant="body2" color="textSecondary">{optionOnePercentage+' %'}</Typography>
                                        </Box>
                                    </Box>                                
                                    <Typography variant="caption">  {optionOneAnswers+' out of '+totalAnswers+' votes'} </Typography>
                                </div>
                                <div style={currentUser.answers[question.id]==='optionTwo'?{backgroundColor:'#3dcfa5'}:{}}>
                                    <Typography variant="subtitle2"> would you rather {question.optionTwo.text} </Typography>
                                    <Box display="flex" alignItems="center">
                                        <Box width="100%" mr={1}>
                                        <LinearProgress variant="determinate" value={optionTwoPercentage} />
                                        </Box>
                                        <Box minWidth={40}>
                                        <Typography variant="body2" color="textSecondary">{optionTwoPercentage+' %'}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="caption">  {optionTwoAnswers+' out of '+totalAnswers+' votes'} </Typography>
                                </div>
                            </div>
                        }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default compose(withRouter, connect())(Question);