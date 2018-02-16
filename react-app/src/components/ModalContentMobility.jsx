/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

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
    return (
      <div>
        <p>
                    <Grid style={grid_style}>
          <Row className="show-grid">
            <Col xs={6} md={6}>
              <strong>
                Knowing how people move can be useful to:
              </strong>
              <ul>
                <li>
                  mapping communities
                </li>
                <li>
                  preventing spread of disease
                </li>
                <li>
                  response to natural disasters
                </li>
              </ul>
              <p>
                <strong>
                We created this prototype to visualize mobility for Colombia given to us by Telefonica. For:
              </strong>
              </p>
              <ul>
                <li>
                  background on this particular app, please read <a href='https://medium.com/@mikefabrikant/the-project-f1f90c2a29b7'>this</a>.
                </li>
                <li>
                  an article that explains how mobility can be generated from cell phone usage, please read <a href='https://medium.com/@mikefabrikant/cell-towers-chiefdoms-and-anonymized-call-detail-records-a-guide-to-creating-a-mobility-matrix-d2d5c1bafb68'>this</a>.

                </li>
              </ul>
            </Col>
            <Col xs={6} md={6}>
              <img src='https://media.giphy.com/media/pb1onNOMlkkrIOXMRJ/giphy.gif' style={gif_style}></img>
            </Col>
          </Row>

              <Row className="show-grid">
                <Col xs={6} md={6}>
                </Col>
                <Col xs={6} md={6}>
                  <iframe width="300" src="https://www.youtube.com/embed/alvUiktZNyI"></iframe>
                </Col>
              </Row>
            </Grid>
              <strong>DISCLAIMER:</strong> The data displayed here is fake, and not what Telefonica provides.

        </p>
         <p>
           <strong> We are always looking for more partners </strong> to validate (and add!) to our existing datasets. Please
           contact <a href={this.props.email}>  this </a> person to learn more.
         </p>
      </div>
    );
  }
}


export default PopupContentMobility
