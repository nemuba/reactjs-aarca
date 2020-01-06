import React, { Fragment } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import TypeForm from './TypeForm';
import Header from './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';

 const TypeNew = (props) => {

    return (
      <Fragment>
        <Header user={getCurrentUser()}/>
        <Container fluid style={{marginBottom: '100px', marginTop: '50px'}}>
        <Row className="justify-content-center mb-3">
          <Col sm={12} lg={8}>
            <TypeForm match={props.match} history={props.history}/>
          </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
  export default TypeNew;
