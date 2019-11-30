import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header/Header';
import Router from './routes';


const App = () => {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;
