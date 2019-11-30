import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Race from './components/Race/Race';
import RaceNew from './components/Race/RaceNew';
import RaceEdit from './components/Race/RaceEdit';
import Home from './components/Home/Home';

class Routes extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/races" exact component={Race} />
          <Route path="/races/new" exact component={RaceNew} />
          <Route path="/races/:id/edit" exact component={RaceEdit} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;