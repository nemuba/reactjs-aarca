import React, { Component } from 'react';
import api from '../../../services/api';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Races extends Component{
  constructor(props){
    super(props);
    this.state = {races: []}
    this.loadRaces = this.loadRaces.bind(this);
  }

  async loadRaces(){
    await api.get('/races.json').then(response => {
      this.setState({
        races: response.data
      });
    });
  }
  componentDidMount(){
    this.loadRaces();
  }

  renderTableBody() {
    return this.state.races.map(race => {
      return (
        <tr key={race.id}>
          <td>
            {race.id}
          </td>
          <td>
            {race.local}
          </td>
          <td>
            {race.description}
          </td>
          <td>
            {
              race.date_race
            }
          </td>
          <td>
            <Link className="btn btn-success btn-sm" to={`/races/${race.id}/edit`}>Editar</Link>
          </td>
        </tr>
      );
    });
  }

  render(){
    return(
        <Row className="justify-content-center" >
          <Col sm={8} >
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Local</th>
                  <th>Description</th>
                  <th>Date Race</th>
                  <th><Link className="btn btn-primary btn-sm" to="/races/new" >Novo</Link></th>
                </tr>
              </thead>
              <tbody>
                {this.renderTableBody()}
              </tbody>
          </table>
          </Col>
        </Row>
    );
  }
}
export default Races;