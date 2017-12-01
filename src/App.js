import React, { Component } from 'react';
import './App.css';
// import Calendar from "./datepicker.js"
import MyMap from "./MyMap.js"
import HeatmapCalendar from "./CalendarHeatmap.js"
import YearlyCalendar from "./YearlyCalendar.js"

class App extends Component {
  render() {
    return (
      <div>
        <MyMap />
         <HeatmapCalendar />
         <YearlyCalendar />
      </div>
    );
  }
}

export default App;
