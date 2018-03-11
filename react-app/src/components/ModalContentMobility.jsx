/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {isBrowser} from 'react-device-detect'
import {
  connect
} from 'react-redux'

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

/* eslint-disable require-jsdoc*/
class PopupContentMobility extends React.Component {
/* eslint-disable require-jsdoc*/
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const gif_style = {width: '300px'}
    const grid_style = {width: '700px'}
    if (isBrowser) {
      return (
        <div>
          <Grid style={grid_style}>
            <Row className="show-grid">
              <Col xs={1} md={6}>
                <p>
                  <strong>Knowing how people move can be useful to...</strong>
                </p>
                <ul>
                  <li>map communities,</li>
                  <li>prevent spread of disease,</li>
                  <li>respond to natural disasters.</li>
                </ul>
                <p>
                  <strong>We created this prototype to visualize fake mobile data for Colombia. To see:</strong>
                </p>
                <ul>
                  <li>background on this particular app, please read <a href='https://medium.com/@mikefabrikant/the-project-f1f90c2a29b7'>this</a>.</li>
                  <li>an article that explains how mobility can be generated from cell phone usage, please read <a href='https://medium.com/@mikefabrikant/cell-towers-chiefdoms-and-anonymized-call-detail-records-a-guide-to-creating-a-mobility-matrix-d2d5c1bafb68'>this</a>.</li>
                </ul>
              </Col>
              <Col xs={1} md={6}>
                <img src='https://media.giphy.com/media/pb1onNOMlkkrIOXMRJ/giphy.gif' style={gif_style}></img>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={1} md={6}>
                <p>
                  <strong>How do I read this map?</strong>
                </p>
                <ul>
                  <li>This map is sorted by administrative boundaries. Read more about administrative boundaries <a href="https://magicbox.readthedocs.io/en/latest/administrative-boundaries.html" target="_blank">here</a>.</li>
                  <li>Click on an administrative boundary to see traffic <em>from</em> that area <em>to</em> another. Click on multiple boundaries to see traffic from those areas collectively.</li>
                  <li>Blue regions are the areas you selected. The shaded red areas show the movement of people traveling to that area from where you selected.</li>
                </ul>
              </Col>
              <Col xs={1} md={6}>
                <iframe width="300" src="https://www.youtube.com/embed/alvUiktZNyI"></iframe>
              </Col>
            </Row>
          </Grid>
          <strong>DISCLAIMER:</strong> The data displayed here is fake, and not what Telefonica provides.
          <p>
            <strong>We are always looking for more partners</strong> to validate (and add!) to our existing datasets. Please contact <a href={this.props.email}>this</a> person to learn more.
          </p>
        </div>
      );
    } else {
      let ul_style =  {
        listStylePosition: 'inside',
        paddingLeft:0,
      }
      return (
        <div>
                <p>
                  <strong>Knowing how people move can be useful to...</strong>
                </p>
                <p>
                <ul style={ul_style}>
                  <li>map communities,</li>
                  <li>prevent spread of disease,</li>
                  <li>respond to natural disasters.</li>
                </ul>
              </p>
                <p>
                  <strong>We created this prototype to visualize mobility for Colombia given to us by Telefonica. For:</strong>
                </p>
                <p>
                <ul style={ul_style}>
                  <li>background on this particular app, please read <a href='https://medium.com/@mikefabrikant/the-project-f1f90c2a29b7'>this</a>.</li>
                  <li>an article that explains how mobility can be generated from cell phone usage, please read <a href='https://medium.com/@mikefabrikant/cell-towers-chiefdoms-and-anonymized-call-detail-records-a-guide-to-creating-a-mobility-matrix-d2d5c1bafb68'>this</a>.</li>
                </ul>
                </p>

                <img src='https://media.giphy.com/media/pb1onNOMlkkrIOXMRJ/giphy.gif' style={gif_style}></img>
                <p>
                  <strong>How do I read this map?</strong>
                </p>
                <ul style={ul_style}>
                  <li>This map is sorted by administrative boundaries. Read more about administrative boundaries <a href="https://magicbox.readthedocs.io/en/latest/administrative-boundaries.html" target="_blank">here</a>.</li>
                  <li>Click on an administrative boundary to see traffic <em>from</em> that area <em>to</em> another. Click on multiple boundaries to see traffic from those areas collectively.</li>
                  <li>Blue regions are the areas you selected. The shaded red areas show the movement of people traveling to that area from where you selected.</li>
                </ul>
                <iframe width="300" src="https://www.youtube.com/embed/alvUiktZNyI"></iframe>
          <strong>DISCLAIMER:</strong> The data displayed here is fake.
          <p>
            <strong>We are always looking for partners</strong> to validate (and add!) to our existing datasets. Please contact <a href={this.props.email}>this</a> person to learn more.
          </p>
        </div>
      )
    }
  }
}


export default PopupContentMobility
