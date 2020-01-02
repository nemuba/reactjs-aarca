import React, { Fragment, useState, useEffect } from 'react';
import { Container, Card, Row, Col, Table, Alert, Button } from 'react-bootstrap';
import Header from './../Header/Header';
import {getCurrentUser} from './../../services/auth';
import api from './../../services/api';
import { FaRunning, FaPlus, FaPen, FaTrash, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sponsor = (props) =>{

  const [sponsors, setSponsors] = useState([]);
  const [erro, setErro] = useState('');
  const [show, setShow] = useState(false);
  const [disable,setDisable] = useState(false);
  const [total_sponsor, setTotalSponsor] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    api.get('/sponsors')
    .then(response => setSponsors(response.data.sponsors))
    .catch(error => console.log(error));
  },[]);

  useEffect(()=>{
    api.get('/sponsors').then(response => {
      setTotalSponsor(response.data.total);
    });
  },[]);

  // carrega todos as corridas
  useEffect(() => {
    api.get(`/sponsors?page=${page}`).then(response => {
      setSponsors(response.data.sponsors);
    });

    api.get(`/sponsors?page=${page+1}`).then(response => {
      setDisable(response.data.sponsors.length > 0);
    });

  }, [page]);

const prevPage = async () => {
  if (page === 1) return;
  setPage(page - 1);
}
const nextPage = () => {
  setPage(disable ? (page + 1) : page);
}

  const handleDestroy = async (sponsor) =>{

    if(window.confirm(`Deseja Excluir: ${sponsor.name} ?`)){
      await api.delete(`/sponsors/${sponsor.id}`, { method: 'DELETE' })
            .then(response => {
              // remove o patrocinador da lista
              setSponsors(sponsors.filter((item) => item !== sponsor));
              // remove to total de item
              setTotalSponsor(total_sponsor - 1);

              setPage(1);
            })
            .catch(error =>{
              setErro('O Patrocinador não pode ser deletado !');
              setShow(true);
            });
    }
  }

  const renderBody = () =>{
    return sponsors.map((sponsor ,index) => {
      return(
        <tr key={index}>
          <td align="center">{sponsor.id}</td>
          <td>{sponsor.name}</td>
          <td>
          <Link to={`/sponsors/${sponsor.id}/edit`} className="btn btn-success btn-sm">
            <FaPen />
          </ Link>
          <Link to="#" className="btn btn-danger btn-sm ml-1" onClick={() => handleDestroy(sponsor)}>
            <FaTrash />
          </Link>
          </td>
        </tr>
      );
    })
  }

  return(
    <Fragment>
      <Header user={getCurrentUser()}/>
    <Container>
    <Row className="justify-content-center">
      <Col sm={12} lg={10}>
        <Card className="mt-3">
        <Card.Header className="bg-dark text-white">
          <Card.Title className="mt-3">
            <FaRunning className="mr-2" />
            Lista de Patrocinadores
            <Link to="/races/new" className="btn btn-outline-primary btn-sm float-right" >
              <FaPlus className="mr-2"/>
              Novo Patrocinador
            </Link>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          {erro && show ?
            <Alert key={erro} className="text-center" variant="danger" onClose={() => setShow(false)}dismissible >
              {erro}
            </Alert> : ""
          }
          <Table hover striped bordered responsive size="sm">
            <thead>
              <tr>
                <td>#</td>
                <td>Nome</td>
                <td>Options</td>
              </tr>
            </thead>
            <tbody>
              {renderBody()}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <p className="float-right m-0">
            Mostrando total de {total_sponsor} Corrida(s)
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
};

export default Sponsor;
