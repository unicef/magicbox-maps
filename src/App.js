import React, { Component } from 'react';
import './App.css';
// import {connect} from 'react-redux'
import MyMap from "./components/MyMap.jsx"
import YearlyCalendar from "./YearlyCalendar.js"

class App extends Component {
  render() {
    return (
      <div>
        <MyMap />
        {/* <YearlyCalendar /> */}
      </div>
    );
  }
}

export default App;
