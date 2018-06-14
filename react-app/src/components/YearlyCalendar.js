import {
  Chart
} from 'react-google-charts';
import React, {
  PropTypes
} from 'react'
import {
  connect
} from 'react-redux'
import AboutData from './AboutData';
// import {
//   fetchDates
// } from '../actions/action-fetch-dates'
import {
  selectDate
} from '../actions/action-select-date.js'
import {isMobile} from 'react-device-detect'

class YearlyCalendar extends React.Component {
  onChange(Chart) {
    let index = Chart.chart.getSelection()[0].row
    let country = this.props.activeCountry.polygons.properties.alpha3.toLowerCase()

    if (index !== undefined) {
      this.props.selectDate(country, this.props.dates[index])
    }
  }

  constructor(props) {
    super(props)
    this.chartEvents = [{
      eventName: 'select',
      callback: this.onChange.bind(this)
    }]
  }

  render() {
    const columns = [{
      type: 'date',
      id: 'Date'
    }, {
      type: 'number',
      id: 'Won/Loss'
    }]

    if (this.props.dates[0] === undefined) {
      return (<div></div>)
    }

    return (
      <div className='calendar-component' style={{visibility: this.props.visibility}}>
        <AboutData/>
        <Chart
          chartType="Calendar"
          columns={columns}
          rows={this.props.dates.map((dateObj) => [dateObj.date, dateObj.journeys])}
          options={{
            title: this.props.source,
            chartPackages: ['calendar'],
          }}
          chartEvents={this.chartEvents}
          legend_toggle
          chartEvents={this.chartEvents}
          width={isMobile ? "80vw" : "400px"}
          height="200px"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dates: state.dates.dateArray,
    date: state.date,
    visibility: state.dates.visibility,
    activeCountry: state.activeCountry
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectDate: (country, data) => {
      dispatch(selectDate(country, data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(YearlyCalendar);
