import React, {Component, useState} from  'react';
import api from '../../../services/api';
import {Card, Button, Row, Col, Form, FormControl} from 'react-bootstrap';

const Edit = (props) => {

    const [local, setLocal] = useState('');
    const [description, setDescription] = useState('');
    const [date_race, setDateRace] = useState('');

  componentDidMount() {
    const { match: { params } } = this.props;

    api.get(`/races/${params.id}`)
      .then(({ data: race }) => {
        const {id, local,description, date_race} =  race;
        this.setState({ id });
        this.setState({ local});
        this.setState({ description});
        this.setState({ date_race});
        console.table({local, description, date_race});

      });
  }


async handleSubmit(e){
  e.preventDefault();
  await api.put(`/races/${this.state.id}`, {
                method: 'PUT',
                headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                race:{
                    local: this.state.local,
                    description: this.state.description,
                    date_race: this.state.date_race
                }

            }).then((response)=>{
                this.props.history.push('/races');
            });
}

handleCancel(e){
  e.preventDefault();
  this.props.history.push('/races');
}

  render(){
    return(
      <Row className="justify-content-center mt-2">
        <Col md={8} offset={2} >
          <Card>
            <Card.Header>
              <Card.Title>Editar Corrida</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Local</Form.Label>
                  <Form.Control type="text" value={this.state.local} onChange={this.onChangeLocal} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control type="text" value={this.state.description} onChange={this.onChangeDescription}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Data</Form.Label>
                  <FormControl type="text" value={this.state.date_race} onChange={this.onChangeDateRace}/>
                </Form.Group>
                <Form.Group>
                  <Button className="float-left" variant="danger" type="submit" onClick={this.hadleCancel}>Voltar</Button>
                    <Button className="float-right" variant="success" type="submit">Atualizar</Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

        </Col>
      </Row>
    );
  }
}
export default Edit;