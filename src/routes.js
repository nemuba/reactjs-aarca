import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {isAuthenticated} from './services/auth';
import TypeTest from './components/TypeTest/TypeTest';
import TypeEdit from './components/TypeTest/TypeEdit';
import TypeNew from './components/TypeTest/TypeNew';
import Race from './components/Race/Race';
import RaceNew from './components/Race/RaceNew';
import RaceEdit from './components/Race/RaceEdit';
import Test from './components/Test/Test';
import TestNew from './components/Test/TestNew';
import TestEdit from './components/Test/TestEdit';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Logout from './components/pages/Logout';
import NotFound from './components/pages/NotFound';
import Home from './components/Home/Home';
import UserInfo from './components/User';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/sign_in", state: { from: props.location } }} />
      )
    }
  />
);

const Routes =(props)=>{

    return(
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/races" exact component={Race} />
          <PrivateRoute path="/races/new" exact component={RaceNew} />
          <PrivateRoute path="/races/:id/edit" exact component={RaceEdit} />
          <PrivateRoute path="/type_tests" exact component={TypeTest} />
          <PrivateRoute path="/type_tests/new" exact component={TypeNew} />
          <PrivateRoute path="/type_tests/:id/edit" exact component={TypeEdit} />
          <PrivateRoute path="/tests" exact component={Test} />
          <PrivateRoute path="/tests/new" exact component={TestNew} />
          <PrivateRoute path="/tests/:id/edit" exact component={TestEdit} />
          <Route path="/sign_in" exact component={SignIn}/>
          <Route path="/sign_up" exact component={SignUp}/>
          <Route path="/logout" exact component={Logout}/>
          <PrivateRoute path="/user_details" exact component={UserInfo}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
export default Routes;