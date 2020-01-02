import React,{useState, useEffect} from 'react';
import {Form,  Button, Card, Col,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from './../../services/api';
import { FaMoneyBill } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { Container } from './styles';
const SponsorForm = (props) => {

  const notify = (msg) => toast(`${msg}`,{autoClose: 2000});

  const [sponsor, setSponsor] = useState({ name: ''});
  const [errors, setErrors] = useState({});

  useEffect(() =>{
    if(props.match.params.id){
      api.get(`/sponsors/${props.match.params.id}`)
      .then(response => {
        setSponsor(response.data);
      });
    }
  },[props.match.params.id]);

  const onChangeText = (e) => {
    setSponsor({...sponsor ,[e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    let method = sponsor.id ? 'patch' : 'post';
    let url = sponsor.id ? `/sponsors/${sponsor.id}` : '/sponsors';

    await api[method](url, {
      sponsor: sponsor
    }).then(response => {
      setErrors({});
      setSponsor(response.data);
      notify(sponsor.id ? "Atualizado com Sucesso !" : "Criado Com Sucesso !");
    })
    .catch(error => {
      setErrors(error.response.data);
      notify("Preencha todos campos !");
    })
    .finally(()=>{
      if(errors !== null){
        return;
      }else{
        setTimeout(() => {
          props.history.push('/sponsors');
        }, 2000);
      }
    });

  }

  return(
        <Card className="mt-3">
            <ToastContainer />
            <Card.Header
            className={ (errors.name) ? "bg-danger text-white" :"bg-dark text-white"}>
              <Card.Title className="mt-2" >
                <FaMoneyBill className="mr-2" />
                {sponsor.id ? "Atualizar Patrocinador" :"Cadastrar novo Patrocinador"}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label  column sm={2}>Nome</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" id="name"
                      value={sponsor.name}
                      placeholder="digite o nome"
                      onChange={onChangeText}
                      autoFocus={true}
                      />
                    <Form.Text style={{color: "red"}}>{errors.name ? [...errors.name] : ''} </Form.Text>
                  </Col>
                </Form.Group>
                <Link to="/sponsors" className="btn btn-danger mr-2">Voltar</Link>
                <Button variant={sponsor.id ? "success" :"primary"} type="submit" onClick={handleSubmit}>
                  {sponsor.id ? "Atualizar" : "Cadastrar"}
                </Button>
              </Form>
            </Card.Body>
          </Card>

  );
};

export default SponsorForm;
