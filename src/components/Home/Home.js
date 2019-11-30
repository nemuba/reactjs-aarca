import React from 'react';
import { Jumbotron,  Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
// import { Container } from './styles';

const Home = (props) => {

  console.log(window.location.pathname);
  return(
    <Container>
      <Jumbotron className="mt-3">
        <h1>Bem, Vindo</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <Link to="/races" className="btn btn-primary">Ver Corridas</Link>
        </p>
      </Jumbotron>
    </Container>
  )
};

export default Home;
