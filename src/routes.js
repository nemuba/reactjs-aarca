import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Races from './components/Races/index/Races';
import RaceNew from './components/Races/new/New';
import RaceEdit from './components/Races/edit/Edit';

class Routes extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/races" component={Races} />
          <Route path="/races/new" component={RaceNew} />
          <Route path="/races/:id/edit" component={RaceEdit} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;