import React,{useState, useEffect} from 'react';
import { Card, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from './../../services/api';
import { FaRunning } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import  Select  from 'react-select';
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

  const onChangeType = (selected) => {
    setTest({...test, type_test_id: selected?.value});
  }
  const onChangeRace = (selected) =>{
    setTest({...test, race_id: selected?.value});
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
            <Select
              onChange={onChangeRace}
              isClearable
              placeholder={"Selecione a Corrida"}
              options={races}
              defaultValue={races.find(race => race.value === test.race_id)}/>
            <Form.Text style={{color: "red"}}>{errors ? errors.race : ''} </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Modalidade</Form.Label>
            <Select
              onChange={onChangeType}
              isClearable
              placeholder={"Selecione o tipo de prova"}
              options={type_tests}/>
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
