import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import TypeForm from './TypeForm';

 const TypeNew = (props) => {

    return (
      <Container>
      <Row className="justify-content-center mb-3">
        <Col lg="10">
          <TypeForm match={props.match} history={props.history}/>
        </Col>
      </Row>
      </Container>
    );
  }
  export default TypeNew;
