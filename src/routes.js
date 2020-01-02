import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/index';
// componets
import TypeTest from './components/TypeTest/TypeTest';
import TypeEdit from './components/TypeTest/TypeEdit';
import TypeNew from './components/TypeTest/TypeNew';
import Race from './components/Race/Race';
import RaceNew from './components/Race/RaceNew';
import RaceEdit from './components/Race/RaceEdit';
import Test from './components/Test/Test';
import TestNew from './components/Test/TestNew';
import TestEdit from './components/Test/TestEdit';
import Sponsor from './components/Sponsor/Sponsor';
import SponsorNew from './components/Sponsor/SponsorNew';
import SponsorEdit from './components/Sponsor/SponsorEdit';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Logout from './components/pages/Logout';
import NotFound from './components/pages/NotFound';
import Home from './components/Home/Home';
import UserInfo from './components/User';

const Routes =(props)=>{

    return(
      <Router>
        <Switch>
          {/* Route root */}
          <PrivateRoute path="/" exact component={Home} />
          {/* Race routes */}
          <PrivateRoute path="/races" exact component={Race} />
          <PrivateRoute path="/races/new" exact component={RaceNew} />
          <PrivateRoute path="/races/:id/edit" exact component={RaceEdit} />
          {/* Type test routes */}
          <PrivateRoute path="/type_tests" exact component={TypeTest} />
          <PrivateRoute path="/type_tests/new" exact component={TypeNew} />
          <PrivateRoute path="/type_tests/:id/edit" exact component={TypeEdit} />
          {/* Tests routes */}
          <PrivateRoute path="/tests" exact component={Test} />
          <PrivateRoute path="/tests/new" exact component={TestNew} />
          <PrivateRoute path="/tests/:id/edit" exact component={TestEdit} />
          {/* Sponsors routes */}
          <PrivateRoute path="/sponsors" exact component={Sponsor} />
          <PrivateRoute path="/sponsors/new" exact component={SponsorNew} />
          <PrivateRoute path="/sponsors/:id/edit" exact component={SponsorEdit} />
          {/* Authenticate routes */}
          <Route path="/sign_in" exact component={SignIn}/>
          <Route path="/sign_up" exact component={SignUp}/>
          <Route path="/logout" exact component={Logout}/>
          {/* User route */}
          <PrivateRoute path="/user_details" exact component={UserInfo}/>
          {/* Page not found route */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
export default Routes;