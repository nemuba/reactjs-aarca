import React,{useState, useEffect} from 'react';
import { Card, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from './../../services/api';
import { FaRunning } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TestForm = (props) => {

  const [test, setTest] = useState({race_id: '', type_test_id: ''})

  const [races, setRaces] = useState([]);
  const [type_tests, setTypeTests] = useState([]);

  const [errors, setErrors] = useState({});

  const notify = (msg) => toast(`${msg}`,{autoClose: 2000});

useEffect(() => {
  if (props.match.params.id) {
    api.get(`/tests/${props.match.params.id}`).then(response => {
      setTest(response.data);
    });
  }
}, [props.match.params.id]);


  useEffect(()=>{
    api.get('/tests/new').then( response => {
      setRaces(response.data.races);
      setTypeTests(response.data.type_tests);
    });
  },[]);

  const onChangeText = (e) => {
    setTest({...test ,[e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let method = test.id ? 'patch' : 'post';
    let url = test.id ? `/tests/${test.id}` : '/tests';

    await api[method](url, {
      test: test
    }).then(response => {
      notify(test.id ? "Atualizado com Sucesso !" : "Criado Com Sucesso !");
      setErrors({});
    }).catch(error => {
      setErrors(error.response.data);
      notify("Preencha todos os campos !");
    }).finally(()=>{
      if(errors !== null){
        return;
      }else{
        setTimeout(() => {
          props.history.push('/tests');
        }, 2000);
      }
    });
  }

  return(
    <Card className="mt-3">
      <ToastContainer />
      <Card.Header className = {
        (errors.race || errors.type_test ) ? "bg-danger text-white" : "bg-dark text-white"
      }>
        <Card.Title className="mt-2 ">
        <FaRunning className="mr-2"/>
          {test.id ? "Atualizar Prova" : "Cadastrar Prova"}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Label>Corridas</Form.Label>
            <Form.Control as="select" id="race_id" value={test.race_id} onChange={onChangeText}>
              <option>Selecione</option>
              {races.map((race, index)=>{
                return(<option key={index} value={race.id}>{race.local}</option>);
              })}
            </Form.Control>
            <Form.Text style={{color: "red"}}>{errors ? errors.race : ''} </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Modalidade</Form.Label>
            <Form.Control as="select" id="type_test_id" value={test.type_test_id} onChange={onChangeText}>
              <option>Selecione</option>
              {type_tests.map((type_test, index)=>{
                return(
                <option key={index}
                value={type_test.id}>
                  {type_test.genre} - {type_test.oar} remos (s)
                  </option>);
              })}
            </Form.Control>
            <Form.Text style={{color: "red"}}>{errors ? errors.type_test : ''} </Form.Text>
          </Form.Group>
          <Link to="/tests" className="btn btn-danger float-left mr-2">Voltar</Link>
          <Button variant={test.id ? "success" : "primary"} onClick={handleSubmit}>
            {test.id ? "Atualizar" : "Cadastrar"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
};

export default TestForm;
