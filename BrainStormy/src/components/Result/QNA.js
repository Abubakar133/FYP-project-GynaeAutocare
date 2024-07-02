import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Label, Progress } from 'semantic-ui-react';

const QNA = ({ questionsAndAnswers }) => {
  const { totalPoints, correctAnswersCount, incorrectAnswersCount, probability } = calculateStats(questionsAndAnswers);

  return (
    <Table celled striped selectable size="large">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No.</Table.HeaderCell>
          <Table.HeaderCell>Questions</Table.HeaderCell>
          <Table.HeaderCell>Your Answers</Table.HeaderCell>
          <Table.HeaderCell>Correct Answers</Table.HeaderCell>
          <Table.HeaderCell>Points</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {questionsAndAnswers.map((item, i) => (
          <Table.Row key={i + 1}>
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>{item.question}</Table.Cell>
            <Table.Cell style={{ color: item.user_answer === item.correct_answer ? 'green' : 'red' }}>
              {item.user_answer}
            </Table.Cell>
            <Table.Cell>
              <span style={{ color: 'green' }}>{item.correct_answer}</span>
              {item.user_answer !== item.correct_answer && (
                <Label color="red" size="mini" style={{ marginLeft: '8px' }}>
                  Incorrect
                </Label>
              )}
            </Table.Cell>
            <Table.Cell>
              {item.point}
              <Icon name="star" color="yellow" style={{ marginLeft: '8px' }} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="5">
            <Progress percent={probability} progress color={probability >= 70 ? 'green' : 'red'} size="small" />
            <p>Total Points: {totalPoints}</p>
            <p>
              <span style={{ color: 'green' }}>Correct Answers: {correctAnswersCount}</span>
            </p>
            <p>
              <span style={{ color: 'red' }}>Incorrect Answers: {incorrectAnswersCount}</span>
            </p>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

const calculateStats = questionsAndAnswers => {
  const totalPoints = questionsAndAnswers.reduce((acc, item) => acc + item.point, 0);
  const incorrectAnswersCount = questionsAndAnswers.reduce(
    (acc, item) => acc + (item.user_answer !== item.correct_answer ? 1 : 0),
    0
  );
  const correctAnswersCount = questionsAndAnswers.length - incorrectAnswersCount;
  const probability = Math.round((correctAnswersCount / questionsAndAnswers.length) * 100);

  return { totalPoints, correctAnswersCount, incorrectAnswersCount, probability };
};

QNA.propTypes = {
  questionsAndAnswers: PropTypes.array.isRequired,
};

export default QNA;
