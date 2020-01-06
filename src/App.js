import React, { Fragment } from 'react';
import Router from './routes';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.css';

const App = (props) => {
  const current_date = ()=> {
    let today = new Date();
    let date = today.getFullYear();
    return date;
  }
  return (
    <Fragment>
      <Router />
      <Footer date={current_date()}/>
    </Fragment>
  )
};

export default App;
