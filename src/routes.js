import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TypeTest from './components/TypeTest/TypeTest';
import TypeEdit from './components/TypeTest/TypeEdit';
import TypeNew from './components/TypeTest/TypeNew';
import Race from './components/Race/Race';
import RaceNew from './components/Race/RaceNew';
import RaceEdit from './components/Race/RaceEdit';
import Test from './components/Test/Test';
import TestNew from './components/Test/TestNew';
import TestEdit from './components/Test/TestEdit';
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
          <Route path="/type_tests" exact component={TypeTest} />
          <Route path="/type_tests/new" exact component={TypeNew} />
          <Route path="/type_tests/:id/edit" exact component={TypeEdit} />
          <Route path="/tests" exact component={Test} />
          <Route path="/tests/new" exact component={TestNew} />
          <Route path="/tests/:id/edit" exact component={TestEdit} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;