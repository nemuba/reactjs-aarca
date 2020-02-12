import React, { Fragment, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import RaceForm from './RaceForm';
import Header from './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';


const RaceNew = (props) => {

  useEffect(()=>{
    document.title = "AARCA - Nova Corrida";
  },[]);

    return (
      <Fragment>
        <Header user={getCurrentUser()} />
        <Container fluid style={{marginBottom: '100px', marginTop: '50px'}}>
          <Row className="justify-content-center mb-3">
            <Col sm={12} lg={8}>
              <RaceForm match={props.match} history={props.history}/>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
  export default RaceNew;
