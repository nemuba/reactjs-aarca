import React, { Fragment, useState, useEffect } from 'react';
import { Jumbotron,  Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Header from './../Header/Header';
import api from './../../services/api';
import {setCurrentUser, setCurrentUserId, getCurrentUser, logout} from './../../services/auth';
// import { Container } from './styles';

const Home = (props) => {

  const [user, setUser] = useState("");

  useEffect(() => {
    document.title = "AARCA - Home";
    api.get('/get_user')
      .then(response => {
        setCurrentUser(response.data.user.email);
        setCurrentUserId(response.data.user.id);
        setUser(getCurrentUser());
      }).catch(error => {
        logout();
        props.history.push('/sign_in');
      });
  }, [props.history])

  return(
    <Fragment>
      <Header user={user}/>
    <Container style={{marginTop: '70px',marginBottom: '100px'}}>
      <Jumbotron className="mt-3">
        <h1>Bem, Vindo</h1>
        <p>
          Associação de Amigos e Remadores da Canoa Caiçara.
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
