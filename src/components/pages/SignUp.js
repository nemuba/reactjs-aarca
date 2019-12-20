import React, {useState} from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';
import {getToken} from './../../services/auth';
import { FaUserCircle } from 'react-icons/fa';

const SignUp = (props) => {
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
    const {email, password, password_confirmation} = user;

    if(!email || !password || !password_confirmation){
      setErro("Preencha todos os campos !");
      setShow(true);
      return;
    }else{
      await api.post('/users',{user: {email, password, password_confirmation}})
      .then(res => {
        props.history.push('/sign_in');
      }).catch(error => {
        setErro("Não foi possivel criar usário");
        setShow(true);
        setUser({email: '', password:'',password_confirmation: ''});
      });
    }
  }

  // se usuário estiver logado redirecionar para Home
  if (getToken()) {
    return <Redirect to = "/" / >
      // senão renderizar login
  } else {

  return(
  <Container fluid>
    <Row className="justify-content-center">
      <Col sm={10} lg={4}>
        <Card className="mb-3"
        style={{margin: "0 auto", top: "60px", boxShadow: "0 2em 1em -0.7em"}}>
          <Card.Header className="bg-dark text-white text-center font-weight-bold">
            <FaUserCircle className="mr-2" />
            <Card.Title className="mt-2">
              Criar Conta
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
                <Form.Control type="email" id="email" placeholder="E-mail" autoComplete="username" onChange={onChangeText}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" id="password" autoComplete="new-password" placeholder="Senha" onChange={onChangeText} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Repita Senha</Form.Label>
                <Form.Control type="password" id="password_confirmation" autoComplete="new-password" placeholder="Repita Senha" onChange={onChangeText} />
              </Form.Group>
              <Button type="submit" block >Criar</Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center">
            <Link to="/sign_in">Efetuar Login</Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
  );
  }
};

export default SignUp;
