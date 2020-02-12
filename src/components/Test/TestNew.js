import React, { Fragment, useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import TestForm from './TestForm';
import Header from  './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';

 const TestNew = (props) => {

  useEffect(()=> document.title = "AARCA - Nova Prova",[]);

    return (
      <Fragment>
        <Header user={getCurrentUser()} />
        <Container fluid style={{marginBottom: '100px', marginTop: '50px'}}>
        <Row className="justify-content-center mb-3">
          <Col lg={8} sm={12}>
            <TestForm match={props.match} history={props.history}/>
          </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
  export default TestNew;
