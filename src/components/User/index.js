import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Header from './../Header/Header';
import { getCurrentUser, getCurrentUserId} from './../../services/auth';
import { FaAcquisitionsIncorporated } from 'react-icons/fa';
import api from "./../../services/api";

const UserInfo = (props) => {
  const [user, setUser] = useState({email: getCurrentUser(), password:''})
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);



  const onChangeText = (e) => {
    setUser({...user ,[e.target.id]: e.target.value});
    console.table(user)
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(user.email){
      await api.patch(`/users/${getCurrentUserId()}`, {
        user: user
      }).then(reponse =>{
        props.history.push('/logout');
      }).catch(error =>{
        setMessage("Erro ao atualizar o usuário");
        setShow(true);
    });
  }else{
    setMessage("Preencha todos os campos !");
    setShow(true);
  }
  }

  return(
    <Fragment>
      <Header user={getCurrentUser()}/>
      <Container>
      <Row className="justify-content-center">
        <Col lg="6" sm="4" >
          <Card style={{width: 400,marginTop: '30px',marginRight: 10}}>
            <Card.Header className="text-center bg-dark text-white">
              <FaAcquisitionsIncorporated size={64} className="float-left"/>
              <h2 className="float-left mt-3">AARCA</h2>
            </Card.Header>
            <Card.Body>
              <Card.Title>Seja Bem Vindo!</Card.Title>
              <Card.Subtitle className="text-muted">{getCurrentUser()}</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="6" sm="6" >
          <Card style={{marginTop: '30px'}}>
            <Card.Header><h4>Informações do usuário</h4></Card.Header>
              <Card.Body>
                {message && show ?
                <Alert key={message} className="text-center" variant="danger" onClose={() => setShow(false)}dismissible >
                  {message}
                </Alert> : ""
                }
                <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="text"
                  id="email"
                  autoComplete="username"
                  placeholder="Digite seu email"
                  onChange={onChangeText}
                  value={user.email}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Digite uma nova senha"
                  onChange={onChangeText}
                  value={user.password}/>
                </Form.Group>
                <Button type="submit" variant="success">Atualizar</Button>
              </Form>
              </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </Fragment>
  );
};

export default UserInfo;
