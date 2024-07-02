import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Button, Transition, Grid, Icon } from 'semantic-ui-react';
import { calculateScore, calculateGrade, timeConverter, shuffle } from '../../utils'; // Import the shuffle function

const Stats = ({ totalQuestions, correctAnswers, timeTaken, replayQuiz, resetQuiz }) => {
  const score = calculateScore(totalQuestions, correctAnswers);
  const { grade, messages } = calculateGrade(score);
  const { minutes, seconds } = timeConverter(timeTaken);

  const [visible, setVisible] = React.useState(false);
  const [randomMessage, setRandomMessage] = React.useState('');

  React.useEffect(() => {
    setVisible(true);
    setRandomMessage(shuffle(messages)[0]); // Shuffle the messages and set the first one as random message
    return () => {
      setVisible(false);
    };
  }, [messages]); // Add messages as a dependency to update the random message when messages change

  return (
    <Transition visible={visible} animation="fade" duration={1000}>
      
      <Segment raised textAlign="center" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
      <h2>Motivational Quote</h2>
      <Segment raised textAlign="center" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <Header as="h1" textAlign="center" style={{ color: '#880e4f', marginBottom: '20px' }}>
          <q style={{ fontStyle: 'italic', fontSize: '1em' }}>{randomMessage}</q> {/* Display the random message */}
        </Header>
        
      </Segment>
        <Header as="h2" style={{ color: '#4caf50' }}>
              Your Performance: {grade}
        </Header>
        <Grid columns={2} stackable textAlign="center" verticalAlign="middle">
          <Grid.Column>
          {/*  */}

            <Header as="h3">
              <Icon name="question circle outline" /> Total Questions: {totalQuestions}
            </Header>
            <Header as="h3">
              <Icon name="check circle outline" color="green" /> Correct Answers: {correctAnswers}
            </Header>
            <Header as="h3">Your Score: {score}%</Header>
            <Header as="h3">Passing Score: 60%</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" style={{ color: '#64b5f6' }}>
              Time Taken
            </Header>
            <Header as="h3">
              <Icon name="clock outline" /> {`${Number(minutes)}m ${Number(seconds)}s`}
            </Header>
          </Grid.Column>
        </Grid>
        <div style={{ marginTop: '20px' }}>
          <Button
            primary
            content="Play Again"
            onClick={replayQuiz}
            icon="redo"
            labelPosition="left"
            style={{ marginBottom: '10px' }}
          />
          <Button
            color="teal"
            content="Back to Home"
            onClick={resetQuiz}
            icon="home"
            labelPosition="left"
            style={{ marginBottom: '10px' }}
          />
        </div>
      </Segment>
    </Transition>
  );
};

Stats.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired,
};

export default Stats;
