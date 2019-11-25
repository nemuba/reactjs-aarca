import React, {Component} from 'react';
import {Card, Form, Button, FormControl, FormLabel , FormGroup, Row, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import api from './../../../services/api';

class New extends Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeLocal = this.onChangeLocal.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDateRace = this.onChangeDateRace.bind(this);

    this.state = {local: '', description: '', date_race: new Date()}
  }
  onChangeLocal(e){
    this.setState({local: e.target.value});
  }
  onChangeDescription(e){
    this.setState({description: e.target.value});
  }
  onChangeDateRace(e){
    this.setState({date_race: e.target.value});
  }

  async handleSubmit(e){
    e.preventDefault();
    await api.post(`/races`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        race: {
          local: this.state.local,
          description: this.state.description,
          date_race: this.state.date_race
        }
      }
    ).then(
      this.props.history.push('/races')
    );

  }

  render(){
    return(
       <Row className="justify-content-center" >
          <Col sm={8} >
        <Card className="mt-2" >
          <Card.Header>
            <Card.Title>Cadastre uma nova corrida</Card.Title>
          </Card.Header>
        <Card.Body>
        <Form onSubmit={this.handleSubmit} >
          <FormGroup>
            <FormLabel>Local</FormLabel>
            <FormControl
              type="text" name="local"
              placeholder="Local .."
              value={this.state.local}
              onChange={this.onChangeLocal}
            />

          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl
              type="text"
              name="description"
              placeholder="Descrição  ..."
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </FormGroup>
          <FormGroup>
          <FormLabel>Date race</FormLabel>
          <DatePicker
          className="form-control"
            dateFormat="dd/MM/yy"
            selected={this.state.date_race}
            onChange={date => this.setState({date_race: date})}
          />
          </FormGroup>

          <FormGroup>
            <Button className="float-right" ariant="primary" type="submit">
              Cadastrar
            </Button>
          </FormGroup>
        </ Form>
        </Card.Body>
        </Card>
        </Col>
        </Row>
    );
  }
}
export default New;