import React, { Fragment, useState, useEffect } from 'react';
import { Jumbotron,  Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Header from './../Header/Header';
import api from './../../services/api';
import {setCurrentUser, setCurrentUserId, getCurrentUser, logout} from './../../services/auth';
// import { Container } from './styles';

const Home = (props) => {

  const [user, setUser] = useState("")

  useEffect(() => {
    api.get('/get_user')
      .then(response => {
        setCurrentUser(response.data.user.email);
        setCurrentUserId(response.data.user.id);
        setUser(getCurrentUser());
      }).catch(error => {
        logout();
        props.history.push('/logn_in');
      });
  }, [props.history])

  return(
    <Fragment>
      <Header user={user}/>
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
    </Fragment>
  )
};

export default Home;
