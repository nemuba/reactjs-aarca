import React, { useState, useEffect, Fragment } from 'react';
import {Container, Row, Col, Card, Button, Table, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from './../../services/api';
import Header from './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';
import {FaArrowLeft, FaArrowRight, FaPlus, FaPen, FaTrash, FaRunning} from 'react-icons/fa';

const Race = (props) => {

const [races, setRaces] = useState([]);
const [page, setPage] = useState(1);
const [disable,setDisable] = useState(false);
const [total_race, setTotalRace] = useState(0);
const [erro, setErro] = useState('');
const [show, setShow] = useState(false);

useEffect(()=>{
  api.get('/races').then(response => {
    setTotalRace(response.data.total);
  });
},[]);

// carrega todos as corridas
useEffect(() =>{
  api.get(`/races?page=${page}`).then(response =>{
    setRaces(response.data.races);
  });

  api.get(`/races?page=${page+1}`).then(response => {
    setDisable(response.data.races.length>0);
  });

},[page]);


const prevPage = async () =>{
  if (page === 1) return;
  setPage(page-1);
}
const nextPage =  () => {
  setPage(disable ? (page + 1) : page);
}

const handleDestroy = async (race) =>{
  if(window.confirm(`Deseja Excluir: ${race.local}?`)){
    // apaga a corrida no banco
    await api.delete(`/races/${race.id}`, { method: 'DELETE' }).then(response =>{
      // remove a corrida da lista
      setRaces(races.filter((item) => item !== race));
      // remove to total de item
      setTotalRace(total_race - 1);

      setPage(1);
    }).catch(error => {
      setErro('Corrida não pode ser deletada !');
      setShow(true);
    });
  }
}

const loadBody = () =>{
  return races.map((race, index )=>{
      return (<tr key={index}>
        <td align="center">{race.id}</td>
        <td>{race.local}</td>
        <td>{race.description.substr(0,20)} ...</td>
        <td align="center">{race.date_race}</td>
        <td>
          <Link to={`/races/${race.id}/edit`} className="btn btn-success btn-sm">
            <FaPen />
          </ Link>
          <Link to="#" className="btn btn-danger btn-sm ml-1" onClick={() => handleDestroy(race)}>
            <FaTrash />
          </Link>
          </td>
      </tr>);
  });
}


    return(
      <Fragment>
        <Header user={getCurrentUser()}/>
        <Container>
          <Row className="justify-content-center mb-3">
            <Col lg={10}>
              <Card className="mt-3">
                <Card.Header className="bg-dark text-white">
                  <Card.Title className="mt-3">
                    <FaRunning className="mr-2" />
                    Lista de Corridas
                    <Link to="/races/new" className="btn btn-outline-primary btn-sm float-right" >
                      <FaPlus className="mr-2"/>
                      Nova Corrida
                    </Link>
                  </Card.Title>
                </Card.Header>
                <Card.Body >
                    {erro && show ?
                      <Alert key={erro} className="text-center" variant="danger" onClose={() => setShow(false)}dismissible >
                        {erro}
                      </Alert> : ""
                     }
                    <Table hover striped bordered responsive size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Local</th>
                        <th>Descrição</th>
                        <th>Data da Corrida</th>
                        <th>Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadBody()}
                    </tbody>
                  </Table>
                  </Card.Body>
                <Card.Footer>
                  <p className="float-right m-0">
                    Mostrando total de {total_race} Corrida(s)
                  </p>
                  <Button disabled={page === 1}
                    variant={page === 1 ? "secondary" : "dark"}
                    onClick={prevPage}
                    className = "float-left mr-2" >
                    <FaArrowLeft />
                  </Button>
                  <Button  disabled={!disable}
                    onClick={nextPage}
                    variant={!disable ? "secondary" : "dark"}
                    className="float-left mr-2">
                      <FaArrowRight  />
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }

  export default Race;