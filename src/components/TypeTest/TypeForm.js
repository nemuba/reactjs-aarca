import React,{useState, useEffect} from 'react';
import {Form,  Button, Card, Col,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from './../../services/api';
import { FaRunning } from 'react-icons/fa';
// import { Container } from './styles';

const TypeForm = (props) => {
  const [type_test, setTypeTest] = useState({
    genre: '',
    oar: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() =>{
    if(props.match.params.id){
      api.get(`/type_tests/${props.match.params.id}`).then(response => {
        setTypeTest(response.data);
      });
    }
  },[props.match.params.id]);

  const onChangeText = (e) => {
    setTypeTest({...type_test ,[e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    let method = type_test.id ? 'patch' : 'post';
    let url = type_test.id ? `/type_tests/${type_test.id}` : '/type_tests';

    await api[method](url, {
      type_test: type_test
    }).then(response => {
      props.history.push('/type_tests');
    }).catch(error => {
      setErrors(error.response.data);
    });
  }

  return(
        <Card className="mt-3">
            <Card.Header
            className={ (errors.genre || errors.oar) ? "bg-danger text-white" :"bg-dark text-white"}>
              <Card.Title className="mt-2" >
                <FaRunning className="mr-2" />
                {type_test.id ? "Atualizar Tipo de Corrida" :"Cadastrar novo Tipo de Corrida"}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label  column sm={2}>Gênero</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" id="genre"
                      value={type_test.genre}
                      placeholder="digite o gênero"
                      onChange={onChangeText}
                      autoFocus={true}
                      />
                     <Form.Text style={{color: "red"}}>{errors ? errors.genre : ''} </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label  column sm={2}>Número de remo(s)</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" id="oar"
                      value={type_test.oar}
                      placeholder="digite o numero de remos"
                      onChange={onChangeText}
                      autoFocus={true}
                      />
                     <Form.Text style={{color: "red"}}>{errors ? errors.oar : ''} </Form.Text>
                  </Col>
                </Form.Group>
                <Link to="/type_tests" className="btn btn-danger mr-2">Voltar</Link>
                <Button variant={type_test.id ? "success" :"primary"} type="submit" onClick={handleSubmit}>
                  {type_test.id ? "Atualizar" : "Cadastrar"}
                </Button>
              </Form>
            </Card.Body>
          </Card>

  );
};

export default TypeForm;
