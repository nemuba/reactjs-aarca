import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import TestForm from './TestForm';

 const TestNew = (props) => {

    return (
      <Container>
      <Row className="justify-content-center mb-3">
        <Col lg="10">
          <TestForm match={props.match} history={props.history}/>
        </Col>
      </Row>
      </Container>
    );
  }
  export default TestNew;
