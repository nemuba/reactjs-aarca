import React,{useState, useEffect,Fragment} from 'react';
import { Container, Row, Col, Card, Table, Button, Alert } from 'react-bootstrap';
import api from './../../services/api';
import Header from './../../components/Header/Header';
import {getCurrentUser} from './../../services/auth';
import { FaList, FaPlus, FaTrash, FaPen, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {Link} from 'react-router-dom';


const TypeTest = (props) => {
  const [type_tests, setTypeTests] = useState([]);
  const [page, setPage] = useState(1);
  const [disable, setDisable] = useState(false);
  const [total_type, setTotalType] = useState(0);
  const [erro, setErro] = useState('');
  const [show, setShow] = useState(false);

  useEffect(()=>{
    api.get('/type_tests').then(response => {
      setTotalType(response.data.total);
    });
  },[]);

  // carrega todos as corridas
  useEffect(() => {
    api.get(`/type_tests?page=${page}`).then(response => {
      setTypeTests(response.data.type_tests);
    });

    api.get(`/type_tests?page=${page+1}`).then(response => {
      setDisable(response.data.type_tests.length > 0);
    });

  }, [page]);

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  }
  const nextPage = async () => {
    setPage(disable ? page + 1 : page);
  }

  const handleDestroy = async (type) =>{
    if (window.confirm(`Deseja Excluir: ${type.genre}?`)) {
      // apaga a corrida no banco
      await api.delete(`/type_tests/${type.id}`, {
        method: 'DELETE'
      }).then(response =>{
       // remove a corrida da lista
       setTypeTests(type_tests.filter((item) => item !== type));

       setTotalType(total_type - 1);

       setPage(1);
    }).catch(error => {
      setErro("Erro ao deletar !");
      setShow(true);
    });
    }
  }

  const renderBody = () =>{
    return(
      type_tests.map(type =>{
        return (
        <tr key={type.id}>
          <td align="center">{type.id}</td>
          <td>{type.genre}</td>
          <td>{type.oar} remo(s)</td>
          <td>
            <Link to={`/type_tests/${type.id}/edit`}
            className="btn btn-success btn-sm">
              <FaPen />
            </Link>
            <Link to="#" className="btn btn-danger btn-sm ml-1 "
              onClick={() => handleDestroy(type)}>
              <FaTrash />
          </Link>
          </td>
        </tr>);
      })
    );
  }

  return(
    <Fragment>
      <Header user={getCurrentUser()}/>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col sm={6} lg={10}>
            <Card>
              <Card.Header className="bg-dark text-white">
                <Card.Title className="mt-3">
                  <FaList className="mr-3"/>
                  Lista de tipos de Provas
                  <Link to="/type_tests/new" className="btn btn-outline-primary btn-sm float-right" >
                        <FaPlus className="mr-2"/>
                        Novo Tipo de Corrida
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
                      <th className="text-center">#</th>
                      <th>Gênero</th>
                      <th>Número de Remo(s)</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderBody()}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <p className="float-right m-0">
                  Mostrando total de {total_type} Corrida(s)
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
                        <FaArrowRight />
                    </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
  </Fragment>
  );

}

export default TypeTest;
