import React,{useState, useEffect} from 'react';
import {Form,  Button, Card, Col,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from './../../services/api';
import { FaRunning } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { Container } from './styles';
const RaceForm = (props) => {

  const notify = (msg) => toast(`${msg}`);

  const [race, setRace] = useState({
    local: '',
    description: '',
    date_race: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() =>{
    if(props.match.params.id){
      api.get(`/races/${props.match.params.id}`)
      .then(response => {
        setRace(response.data);
      });
    }
  },[props.match.params.id]);

  const onChangeText = (e) => {
    setRace({...race ,[e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    let method = race.id ? 'patch' : 'post';
    let url = race.id ? `/races/${race.id}` : '/races';

    if (race.local !== '' && race.description !== '' && race.date_race !== '') {
    await api[method](url, {
      race: race
    }).then(response => {
      setErrors({});
      setRace(response.data);
      notify(race.id ? "Atualizado com Sucesso !" : "Criado Com Sucesso !");
    }).catch(error => {
      setErrors(error.reponse.data);
    });
  }else{
    notify("Preencha todos campos !");
  }
  }

  return(
        <Card className="mt-3">
            <ToastContainer />
            <Card.Header
            className={ (errors.local || errors.description || errors.date_race) ? "bg-danger text-white" :"bg-dark text-white"}>
              <Card.Title className="mt-2" >
                <FaRunning className="mr-2" />
                {race.id ? "Atualizar Corrida" :"Cadastrar nova Corrida"}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label  column sm={2}>Local</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" id="local"
                      value={race.local}
                      placeholder="digite o local"
                      onChange={onChangeText}
                      autoFocus={true}
                      />
                     <Form.Text style={{color: "red"}}>{errors.local ? [...errors.local] : ''} </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group >
                  <Form.Label>Descrição</Form.Label>
                    <Form.Control as="textarea" id="description"
                      value={race.description}
                      rows="5"
                      onChange={onChangeText} />
                       <Form.Text style={{color: "red"}}>{errors.description ? [...errors.description] : ''} </Form.Text>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2} >Data da Corrida</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="date" id="date_race"
                        value={race.date_race}
                        onChange={onChangeText}/>
                         <Form.Text style={{color: "red"}}>{errors.date_race ? [...errors.date_race] : ''} </Form.Text>
                    </Col>
                </Form.Group>
                <Link to="/races" className="btn btn-danger mr-2">Voltar</Link>
                <Button variant={race.id ? "success" :"primary"} type="submit" onClick={handleSubmit}>
                  {race.id ? "Atualizar" : "Cadastrar"}
                </Button>
              </Form>
            </Card.Body>
          </Card>

  );
};

export default RaceForm;
