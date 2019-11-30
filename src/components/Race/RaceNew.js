import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import RaceForm from './RaceForm';

 const RaceNew = (props) => {

    return (
      <Container>
      <Row className="justify-content-center mb-3">
        <Col lg="10">
          <RaceForm match={props.match} history={props.history}/>
        </Col>
      </Row>
      </Container>
    );
  }
  export default RaceNew;
