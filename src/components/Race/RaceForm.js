import React,{useState, useEffect} from 'react';
import {Form,  Button, Card, Col,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from './../../services/api';
import { FaRunning } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

// import { Container } from './styles';
const RaceForm = (props) => {

  const notify = (msg) => toast(`${msg}`,{autoClose: 2000});

  const [race, setRace] = useState({
    local: '',
    description: '',
    status: '',
    date_race:''
  });

  const [status, setStatus] = useState([]);

  const [errors, setErrors] = useState([]);

  useEffect(() =>{
    if(props.match.params.id){
      api.get(`/races/${props.match.params.id}`)
      .then(response => {
        setRace(response.data);
      });
    }
  },[props.match.params.id]);

  useEffect(()=>{
    api.get('/races/new')
    .then(response => setStatus(response.data.race_enums))
    .catch(erro => console.log(erro));
  },[]);

  const onChangeText = (e) => {
    setRace({...race ,[e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    let method = race.id ? 'patch' : 'post';
    let url = race.id ? `/races/${race.id}` : '/races';

    await api[method](url, {
      race: race
    }).then(response => {
      setErrors({});
      notify(race.id ? "Atualizado com Sucesso !" : "Criado Com Sucesso !");
    }).catch(error => {
      setErrors(error.response.data);
      notify("Preencha todos campos !");
    }).finally(() =>{
        setTimeout(() => {
            props.history.push('/races');
        }, 2000);
    });
  }

  const renderStatus = (status) =>{
    return(
      status.map((option)=>{
        return(<option key={option[2]} value={option[1]}>{option[0]}</option>);
      })
    );
  }

  return(
        <Card className="m-3">
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
                      <Form.Control
                        id="date_race"
                        type="date"
                        value={race.date_race}
                        onChange={onChangeText}
                        />
                        <Form.Text style={{color: "red"}}>{errors.date_race ? [...errors.date_race] : ''} </Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status da corrida</Form.Label>
                  <Form.Control
                    as="select"
                    id="status"
                    value={race.status}
                    onChange={onChangeText}>
                    <option>Selecione</option>
                    {renderStatus(status)}
                  </Form.Control>
                  <Form.Text style={{color: "red"}}>{errors.status ? [...errors.status] : ''} </Form.Text>
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
