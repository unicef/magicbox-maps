/* eslint-disable no-unused-vars*/
import React, {
  Component
} from 'react';
/* eslint-enable no-unused-vars*/
import './App.css';
// import {connect} from 'react-redux'
import MyMap from './components/MyMap'
import YearlyCalendar from './components/YearlyCalendar'
/**
 * Main App
 */
class App extends Component {
  /**
   * render - Render component
   *
   * @return {type}  description
   */
  render() {
    return (
      <div>
        <MyMap />
        <YearlyCalendar />
      </div>
    );
  }
}

export default App;
