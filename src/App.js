import React, { Component } from 'react';
import './App.css';
import Calendar from "./datepicker.js"

class App extends Component {
  render() {
    return (
      <div className="container">
         <Calendar />
        </div>
    );
  }
}

export default App;
