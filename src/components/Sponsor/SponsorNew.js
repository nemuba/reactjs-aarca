import React, { Fragment} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SponsorForm from './SponsorForm';
import Header from './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';


const SponsorNew = (props) => {
    return (
      <Fragment>
        <Header user={getCurrentUser()} />

        <Container>
        <Row className="justify-content-center mb-3">
          <Col lg="10">
            <SponsorForm match={props.match} history={props.history}/>
          </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
  export default SponsorNew;
