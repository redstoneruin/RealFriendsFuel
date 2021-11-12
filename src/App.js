import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';


import Menu from './components/menu/Menu';
import CalculatorPage from './components/calculator/CalculatorPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded:true
    };
  }



  render() {
    return(
      <div>
      { this.state.loaded ?
        <BrowserRouter>
          <Menu {...this.props} {...this.state} />
          <Routes>
            <Route exact path='/' element={<Navigate to="/calculator" /> } />
            <Route exact path='/calculator' element={<CalculatorPage {...this.props} {...this.state} />} />
            <Route path='/' element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter> : null
      }
      </div>
    );
  }

}

export default App;
