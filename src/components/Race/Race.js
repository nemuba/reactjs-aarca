import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from './../../services/api';
import Header from './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';
import {format, parseISO} from 'date-fns';
import {FaArrowLeft, FaArrowRight, FaPlus, FaPen, FaTrash, FaRunning} from 'react-icons/fa';

const Race = (props) => {

const [races, setRaces] = useState([]);
const [page, setPage] = useState(1);
const [disable,setDisable] = useState(false);
const [total_race, setTotalRace] = useState(0);
const [erro, setErro] = useState('');
const [show, setShow] = useState(false);

useEffect(()=>{
  document.title = "AARCA - Corridas";
  api.get('/races').then(response => {
    setTotalRace(response.data.total);
  });
},[]);

// carrega todos as corridas paginadas
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

const formatDate = date => format(parseISO(date),'dd/MM/yyyy');

const loadBody = () =>{
  return races.map((race, index )=>{
      return (<tr key={index}>
        <td align="center">{race.id}</td>
        <td>{race.local.substr(0,20)} ...</td>
        <td>{race.description.substr(0,20)} ...</td>
        <td>{race.status}</td>
        <td>{race.sponsor}</td>
        <td align="center">{formatDate(race.date_race)}</td>
        <td align="center">
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
        <Container fluid style={{marginBottom: '100px', marginTop: '50px'}}>
          <Row className="justify-content-center mb-3">
            <Col lg={8} sm={12} >
              <Card className="m-3">
                <Card.Header className="bg-dark text-white">
                  <Card.Title className="mt-3 float-left">
                    <FaRunning className="mr-2" />
                    Corridas
                  </Card.Title>
                  <Link to="/races/new" className="btn btn-outline-primary btn-sm float-right mt-3" >
                    <FaPlus className="mr-2"/>
                    Nova Corrida
                  </Link>
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
                        <th className="text-center">#</th>
                        <th>Local</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th className="text-center">Patrocinador</th>
                        <th className="text-center">Data</th>
                        <th className="text-center">Opções</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadBody()}
                    </tbody>
                  </Table>
                  </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col lg={6} sm={6}>
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
                    </Col>
                    <Col lg={6} sm={6}>
                      <p className="text-center mt-3 text-muted">
                        Total de {total_race} Corrida(s)
                      </p>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }

  export default Race;