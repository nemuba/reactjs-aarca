import React, {useState} from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import api from './../../services/api';
import {login,getToken} from './../../services/auth';
import {Redirect, Link} from 'react-router-dom';
import { FaUserLock } from 'react-icons/fa';

const SignIn = (props) => {
  //show alert
  const [show, setShow] = useState(true);
  // erro de login
  const [erro, setErro] = useState('');
  const [user, setUser] = useState({email: '', password: ''});

  const onChangeText = (e) =>{
    setUser({...user,[e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) =>{
      e.preventDefault();
  const {email, password} = user;

    if(!email || !password){
      setErro("Preencha todos os campos !");
      setShow(true);
    }else{
      await api.post('/user_token',{auth: {email, password}})
      .then(response => {
        login(response.data.jwt);
        props.history.push('/');
      }).catch(error => {
        setErro("Email ou senha errado !");
        setShow(true);
      });
    }

}
  // se usuário estiver logado redirecionar para Home
  if (getToken()) {
    return <Redirect to = "/" />
  // senão renderizar login
  } else {

  return(
  <Container style={{marginBottom:'100px'}}>
    <Row className="justify-content-center align-items-center">
      <Col sm={10} lg={5}>
        <Card  className="mb-5"
          style={{marginTop: '60px',boxShadow: "0 2em 1em -0.7em"}}>
          <Card.Header className="bg-dark text-white text-center font-weight-bold">
            <FaUserLock size={32}/>
            <Card.Title className="mt-2">
              Login
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {erro && show ?
            <Alert key={erro} className="text-center" variant="danger" onClose={() => setShow(false)}dismissible >
              {erro}
            </Alert> : ""
            }
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email"
                id="email"
                placeholder="E-mail"
                onChange={onChangeText}
                autoComplete="username" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="Senha"
                  onChange={onChangeText}
                  autoComplete="current-password"/>
              </Form.Group>
              <Button type="submit" block>Login</Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center">
            <Link to="/sign_up" >Criar Usuário</Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
  );
  }
};

export default SignIn;
