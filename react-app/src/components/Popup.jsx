/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  Tooltip,
  OverlayTrigger,
  Button,
  Modal,
  Popover
} from 'react-bootstrap';
import {
  connect
} from 'react-redux'
import ModalContentSchools from './ModalContentSchools';
import ModalContentMobility from './ModalContentMobility';
const config = require('../config.js')

/* eslint-disable require-jsdoc*/
class Popup extends React.Component {
/* eslint-disable require-jsdoc*/
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
  }


  render() {
    let ModalContent = ModalContentSchools
    let email = config.email_contact_schools

    const style = {
      backgroundColor: 'orange',
      position: 'relative',
      float: 'left'
    }
    let mode = config.mode
    let header = 'School'
    if (mode.match('mobility')) {
      ModalContent = ModalContentMobility
      email = config.email_contact_mobility
      header = 'Mobility'
    }
    return (
      <div>
        <Button bsStyle="primary" bsSize="large"
          style={style} onClick={this.handleShow}>
          ?
        </Button>

        <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-lg">
              {header} Mapping  |  Alpha Version
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalContent email={email} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default Popup
