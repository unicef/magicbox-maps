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
    return (
      <div>
        <p>
           Knowing how people move can be useful to:
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
              We created this prototype to visualize mobility for Colombia given to us by Telefonica. For:
            </p>
            <ul>
              <li>
                background on this particular app, please read <a href='https://medium.com/@mikefabrikant/the-project-f1f90c2a29b7'>this</a>.
              </li>
              <li>
                an article that explains how mobility can be generated from cell phone usage, please read <a href='https://medium.com/@mikefabrikant/cell-towers-chiefdoms-and-anonymized-call-detail-records-a-guide-to-creating-a-mobility-matrix-d2d5c1bafb68'>this</a>.

              </li>
            </ul>
            <p>
              </p>
            <p>
              To learn about other applications we've created around mobility, please see:
            </p>
            <Grid>
              <Row className="show-grid">
                <Col xs={2} md={1}>
                </Col>
                <Col xs={8} md={8}>
                  <iframe width="200" height="150" src="https://www.youtube.com/embed/alvUiktZNyI"></iframe>
                </Col>
                <Col xs={2} md={1}>
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
