import React, { useState, useEffect, Fragment } from 'react';
import {Container, Row, Col, Card, Button, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from './../../services/api';
import Header from  './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';
import {FaArrowLeft, FaArrowRight, FaPlus, FaPen, FaTrash, FaRunning} from 'react-icons/fa';

const Test = (props) => {

const [tests, setTests] = useState([]);
const [page, setPage] = useState(1);
const [disable,setDisable] = useState(false);
const [total_test, setTotalTest] = useState(0);

useEffect(()=>{
  api.get('/tests').then(response => {
    setTotalTest(response.data.total);
  });
},[]);

// carrega todos as corridas
useEffect(() =>{
  api.get(`/tests?page=${page}`).then(response =>{
    setTests(response.data.tests);
  });

  api.get(`/tests?page=${page+1}`).then(response => {
    setDisable(response.data.tests.length>0);
  });

},[page]);


const prevPage = async () =>{
  if (page === 1) return;
  setPage(page-1);
}
const nextPage =  () => {
  setPage(disable ? page+1 : page);
}

const handleDestroy = async (test) =>{
  if(window.confirm(`Deseja Excluir ?`)){
    // apaga a corrida no banco
    await api.delete(`/tests/${test.id}`, { method: 'DELETE' });

    // remove a corrida da lista
    setTests(tests.filter((item) => item !== test));

    // remove to total de item
    setTotalTest(total_test - 1);

    setPage(1);

  }
}

const loadBody = () =>{
  return tests.map((test, index )=>{
      return (<tr key={index}>
        <td align="center">{test.id}</td>
        <td>{test.race.substr(0,20)} ...</td>
        <td>{test.type_test}</td>
        <td align="center">
          <Link to={`/tests/${test.id}/edit`} className="btn btn-success btn-sm">
            <FaPen />
          </ Link>
          <Link to="#" className="btn btn-danger btn-sm ml-1" onClick={() => handleDestroy(test)}>
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
          <Col lg={10} sm={6}>
            <Card className="m-3">
              <Card.Header className="bg-dark text-white">
                <Card.Title className="mt-3 float-left">
                  <FaRunning className="mr-2" />
                  Lista de Provas
                </Card.Title>
                <Link to="/tests/new" className="btn btn-outline-primary btn-sm mt-3 float-right" >
                  <FaPlus className="mr-2"/>
                  Nova Prova
                </Link>
              </Card.Header>
              <Card.Body >
                  <Table hover striped bordered responsive size="sm">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Corrida</th>
                      <th>Modalidade</th>
                      <th className="text-center">Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadBody()}
                  </tbody>
                </Table>
                </Card.Body>
              <Card.Footer>
                <p className="float-right m-0">
                  Mostrando total de {total_test} Corrida(s)
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

  export default Test;