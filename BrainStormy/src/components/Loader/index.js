import React from 'react';
import { Container, Message, Icon } from 'semantic-ui-react';

const Loader = ({ title, message }) => (
  <Container style={{ backgroundColor: '#b2ebf2', padding: '20px', borderRadius: '10px' }}>
    <Message icon size="big" color="pink">
      <Icon name="circle notched" loading color="blue" />
      <Message.Content>
        <Message.Header style={{ color: '#ff1744' }}>{title ? title : 'Just one second'}</Message.Header>
        <Message.Content style={{ color: '#880e4f' }}>{message ? message : 'We are fetching that content for you.'}</Message.Content>
      </Message.Content>
    </Message>
  </Container>
);

export default Loader;
