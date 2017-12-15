/* eslint-disable no-unused-vars*/
import React, {
  Component
} from 'react';
import './App.css';
// import {connect} from 'react-redux'
import MyMap from './components/MyMap.jsx'
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
        {/* <YearlyCalendar /> */}
      </div>
    );
  }
}

export default App;