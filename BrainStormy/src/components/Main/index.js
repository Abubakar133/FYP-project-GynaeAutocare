import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Item, Dropdown, Divider, Button, Message } from 'semantic-ui-react';
import mindImg from '../../images/mother_heart.svg';
import { CATEGORIES, NUM_OF_QUESTIONS, DIFFICULTY, QUESTIONS_TYPE, COUNTDOWN_TIME } from '../../constants';
import { shuffle } from '../../utils';
import Offline from '../Offline';

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('easy');
  const [questionsType, setQuestionsType] = useState('0');
  const [countdownTime, setCountdownTime] = useState({ minutes: 120, seconds: 0 });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (category && numOfQuestions && difficulty && questionsType && (countdownTime.minutes || countdownTime.seconds)) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);
    if (error) setError(null);

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    fetch(API)
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          const { response_code, results } = data;
          if (response_code === 1) {
            const message = <p>The API doesn't have enough questions for your query. Please change the settings.</p>;
            setProcessing(false);
            setError({ message });
            return;
          }

          results.forEach(element => {
            element.options = shuffle([element.correct_answer, ...element.incorrect_answers]);
          });

          setProcessing(false);
          startQuiz(results, countdownTime.minutes * 60 + countdownTime.seconds); // Convert minutes and seconds to total seconds
        }, 1000);
      })
      .catch(error => {
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000);
      });
  };

  if (offline) return <Offline />;

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Segment style={{ maxWidth: '600px' }}>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header as="h1" style={{ color: '#880e4f' }}>
                Empower Your Pregnancy: Nurturing Minds, Elevating IQs!
              </Item.Header>
              {error && (
                <Message negative onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  header="Select Quiz Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                  style={{ marginBottom: '10px', backgroundColor: '#64b5f6', color: '#880e4f' }}
                />
                <Dropdown
                  fluid
                  selection
                  name="numOfQ"
                  placeholder="Select No. of Questions"
                  header="Select No. of Questions"
                  options={NUM_OF_QUESTIONS}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNumOfQuestions(value)}
                  disabled={processing}
                  style={{ marginBottom: '10px', backgroundColor: '#64b5f6', color: '#880e4f' }}
                />
                <Dropdown
                  fluid
                  selection
                  name="difficulty"
                  placeholder="Select Difficulty Level"
                  header="Select Difficulty Level"
                  options={DIFFICULTY}
                  value={difficulty}
                  onChange={(e, { value }) => setDifficulty(value)}
                  disabled={processing}
                  style={{ marginBottom: '10px', backgroundColor: '#64b5f6', color: '#880e4f' }}
                />
                <Dropdown
                  fluid
                  selection
                  name="type"
                  placeholder="Select Questions Type"
                  header="Select Questions Type"
                  options={QUESTIONS_TYPE}
                  value={questionsType}
                  onChange={(e, { value }) => setQuestionsType(value)}
                  disabled={processing}
                  style={{ marginBottom: '10px', backgroundColor: '#64b5f6', color: '#880e4f' }}
                />
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? 'Processing...' : 'Play Now'}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing}
                  style={{ backgroundColor: '#ff1744', color: '#fff' }}
                />
                
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;

// import React from 'react';
// import { Container, Header, Image, Button, Grid } from 'semantic-ui-react';
// import brainImg from './Brainstormy.svg';
// import testImg from './test.svg';
// import knowledgeImg from './knowledge.svg';

// const Brainstormy = ({ startQuiz }) => {
//   const handleKnowledgeClick = () => {
//     startQuiz();
//   };

//   const handleTestClick = () => {
//     console.log('Test My Knowledge button clicked');
//   };

//   return (
//     <Container style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <Header as="h1" textAlign="center" style={{ color: '#880e4f', marginBottom: '20px' }}>
//         <Image src={brainImg} alt="Brainstormy Logo" style={{ marginRight: '10px' }} />
//         Brainstormy
//       </Header>
//       <Grid columns={2} stackable centered>
//         <Grid.Column>
//           <Button onClick={handleKnowledgeClick} style={{ backgroundColor: '#57a4ff', color: '#fff', width: '100%' }}>
//             <Image src={knowledgeImg} alt="Knowledge Logo" style={{ marginBottom: '10px' }} />
//            <hr></hr>
//             <h2>Gain Knowledge</h2>
//             <p style={{ marginTop: '5px', color: '#fff' }}>
//               <h4>Explore educational content about gynecology.</h4>
//             </p>
//           </Button>
//         </Grid.Column>
//         <Grid.Column>
//           <Button onClick={handleTestClick} style={{ backgroundColor: '#f759ab', color: '#fff', width: '100%' }}>
//             <Image src={testImg} alt="Test Logo" style={{ marginBottom: '10px' }} />
//             <hr></hr>
//             <h2>Test My Knowledge</h2>
//             <p style={{ marginTop: '5px', color: '#fff' }}>
//               Take quizzes and tests to improve baby health.
//             </p>
//           </Button>
//         </Grid.Column>
//       </Grid>
//     </Container>
//   );
// };

// export default Brainstormy;
