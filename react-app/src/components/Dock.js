import React, {
  Component
} from 'react';
/* eslint-enable no-unused-vars*/
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'
import SliderChange from '../actions/action-slider-change';
import {
  Col,
  Row,
  Grid
} from 'react-bootstrap'
import Dock from 'react-dock';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {
  Pie
} from 'react-chartjs-2';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
const styles = {
  remove: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '10px',
    cursor: 'pointer'
  },
  general: {
    color: 'white'

  }
}

let options = {
  legend: {
    display: true,
    position: 'bottom',
  }
}


class Docker extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: 3,
    // }
  }
  handleChange(value) {
    this.props.map.setState({
      value: value
    })
    this.props.sliderChange(this.props.activeCountry.points, value);
  }

  render() {
    const data = {
      labels: [
        'Green',
        'Yellow',
        'Orange',
        'Purple'
      ],
      datasets: [{
        data: [
          this.props.sliderValues.aboveT,
          this.props.sliderValues.belowT,
          this.props.sliderValues.zeroT,
          this.props.sliderValues.nullT,
        ],
        backgroundColor: [
          '#5cb85c',
          '#F5A623',
          '#d9534f',
          '#6A1E74'

        ],
        hoverBackgroundColor: [
          '#5cb85c',
          '#F5A623',
          '#d9534f',
          '#6A1E74'
        ]
      }]
    };

    return (
      <Dock
        isVisible={this.props.docker}
        dockStyle={{ background: 'rgba(0, 0, 0, 0.4)' }}
        position='bottom'
        dimMode='none'
        defaultSize = {0.35}
      >
        <div style={styles.general}>
          <div style={{'textAlign': 'center'}}>
            <h2>{this.props.activeCountry.selectedCountryName}</h2>
          </div>
          <Glyphicon glyph='remove'
            onClick={() => this.setState({ docker: false })}
            style={styles.remove} />
          <Grid>
            <Row className="show-grid">
              <Col md={4}>
                <h3> Information </h3>
                <h4> Number of Schools: {this.props.activeCountry.selectedCountryNumSchools}</h4>
                <h4> Average speed: {this.props.activeCountry.selectedCountryAvgMbps}</h4>
              </Col>
              <Col md={4}>
                <Pie data={data} options={options} />
              </Col>
              <Col md={4}>
                <div className='slider'>
                  <Slider
                    min={0}
                    max={12}
                    step={0.5}
                    value={this.props.slider}
                    onChange={this.handleChange.bind(this)}
                  />
                  <div className='value'>{this.props.slider}</div>
                </div>

              </Col>
            </Row>
          </Grid>
        </div>
      </Dock>

    );
  }
}

/* eslint-disable require-jsdoc*/
function mapStateToProps(state) {
  return {
    activeCountry: state.activeCountry,
    sliderValues: state.sliderChanged
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    sliderChange: SliderChange,
  }, dispatch)
}

/* eslint-enablerequire-jsdoc*/
export default connect(mapStateToProps, matchDispatchToProps)(Docker);