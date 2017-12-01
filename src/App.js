import React, { Component } from 'react';
import './App.css';
import HeatmapCalendar from "./CalendarHeatmap.js"

class App extends Component {
  render() {
    return (
      <div className="container">
         <HeatmapCalendar />
        </div>
    );
  }
}

export default App;
