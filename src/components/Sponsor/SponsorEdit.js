import React, { Fragment} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import SponsorForm from './SponsorForm';
import Header from './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';
import { useEffect } from 'react';


const SponsorEdit = (props) => {

  useEffect(()=>  document.title = "AARCA - Editar Patrocinador",[]);

    return (
      <Fragment>
        <Header user={getCurrentUser()} />

        <Container fluid style={{marginBottom: '100px', marginTop: '50px'}}>
        <Row className="justify-content-center mb-3">
          <Col lg={8} sm={12}>
            <SponsorForm match={props.match} history={props.history}/>
          </Col>
        </Row>
        </Container>
      </Fragment>
    );
  }
  export default SponsorEdit;
