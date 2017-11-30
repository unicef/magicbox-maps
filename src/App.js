import React, { Component } from 'react';
import './App.css';
// import Calendar from "./datepicker.js"
import MyMap from "./MyMap.js"
import Calendar from "./datepicker.js"
class App extends Component {
  render() {
    return (
      <div>
        <MyMap />
         <Calendar />
      </div>
    );
  }
}

export default App;
