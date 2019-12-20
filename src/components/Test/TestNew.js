import React, { Fragment } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import TestForm from './TestForm';
import Header from  './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';

 const TestNew = (props) => {

    return (
      <Fragment>
        <Header user={getCurrentUser()} />
        <Container>
        <Row className="justify-content-center mb-3">
          <Col lg="10">
            <TestForm match={props.match} history={props.history}/>
          </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
  export default TestNew;
