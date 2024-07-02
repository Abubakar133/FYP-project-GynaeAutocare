import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Item, Divider, Button, Icon, Menu, Header } from 'semantic-ui-react';
import he from 'he';
import Countdown from '../Countdown';
import { getOption } from '../../utils';

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSelectedAns, setUserSelectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    if (questionIndex > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questionIndex]);

  const handleItemClick = (e, { name }) => {
    setUserSelectedAns(name);
  };

  const handleNext = () => {
    let point = 0;
    if (userSelectedAns === he.decode(data[questionIndex].correct_answer)) {
      point = 1;
    }

    const qna = questionsAndAnswers.concat({
      question: he.decode(data[questionIndex].question),
      user_answer: userSelectedAns,
      correct_answer: he.decode(data[questionIndex].correct_answer),
      point,
    });

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSelectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = timeTaken => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Segment padded="very" color="pink">
        <Header as="h1" icon textAlign="center" color="blue">
          <Icon name="heartbeat" />
          BrainStormy
        </Header>
        <Divider />
        <Item.Group divided>
          <Item>
            <Item.Content>
              <Item.Extra>
                <Header as="h2" floated="left">
                  Question No. {questionIndex + 1} of {data.length}
                </Header>
                <Countdown
                  minutes={countdownTime.minutes}
                  seconds={countdownTime.seconds}
                  timeOver={timeOver}
                  setTimeTaken={setTimeTaken}
                />
              </Item.Extra>
              <br />
              <Item.Meta>
                <Header as="h3" color="blue">
                  <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
                </Header>
                <Divider />
                <Menu vertical fluid size="large">
                  {data[questionIndex].options.map((option, i) => {
                    const letter = getOption(i);
                    const decodedOption = he.decode(option);

                    return (
                      <Menu.Item
                        key={decodedOption}
                        name={decodedOption}
                        active={userSelectedAns === decodedOption}
                        onClick={handleItemClick}
                      >
                        <b style={{ marginRight: '8px' }}>{letter}</b>
                        {decodedOption}
                      </Menu.Item>
                    );
                  })}
                </Menu>
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  content="Next"
                  onClick={handleNext}
                  floated="right"
                  icon="right chevron"
                  labelPosition="right"
                  disabled={!userSelectedAns}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Container>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.shape({
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
