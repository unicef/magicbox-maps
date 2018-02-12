/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
  connect
} from 'react-redux'

/* eslint-disable require-jsdoc*/
class PopupContentMobility extends React.Component {
/* eslint-disable require-jsdoc*/
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div>
        <p>
           Welcome to UNICEF's real-time data visualization! This project is in its <strong> alpha version </strong> and is a continuous work in
           progress. The data available does not necessarily represent a complete inventory of a country's school locations and level
           of Internet connectivity. <strong> We are always looking for more partners </strong> to validate (and add!) to our existing datasets. Please
           contact <a href= {this.props.email}>  the School Mapping team </a> to learn more.
         </p>
         <p>
           <b>Navigating this map:</b>
           This map brings together a wide range of data, including school location and other key attributes as well as information
           on school Internet connectivity, both in terms of speed (Mbs) and type (2G and 3G). Click on a country to see what
           information is currently available and on individual dots to find out more details for a particular school.
         </p>
         <h4>Note:</h4>
         <p> Not all data has been independently verified. We also only have partial data for some countries and are looking for your help to continue filling out this map.</p>

      </div>
    );
  }
}


export default PopupContentMobility
