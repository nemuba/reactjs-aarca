import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';

// import { Container } from './styles';

const NotFound = (props) => {
  return(
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col sm={10} lg={10}>
          <Card bg="dark" text="white" className="text-center mt-3">
            <Card.Header><h1>Página não encontrada!</h1></Card.Header>
            <Card.Body>
              <Link to="/" className="text-white btn btn-outline-primary">Voltar</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
