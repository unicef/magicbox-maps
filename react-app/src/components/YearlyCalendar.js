import {
  Chart
} from 'react-google-charts';
import React, {
  PropTypes
} from 'react'
import {
  connect
} from 'react-redux'
import {
  fetchDates
} from '../actions/action-fetch-dates'
import {
  selectDate
} from '../actions/action-select-date.js'

class YearlyCalendar extends React.Component {
  onChange(Chart) {
    this.props.selectDate(Chart.chart.getSelection()[0].date)
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
    if (new Date(this.props.dates.dateArray).getYear() == 1) {
      return (<div></div>)
    }

    return (
      <div className='calendar-component' style={{visibility: this.props.visibility}}>
        <Chart
          chartType="Calendar"
          columns={columns}
          rows={this.props.dates}
          options={{
            title: this.props.source,
            chartPackages: ['calendar'],
          }}
          chartEvents={this.chartEvents}
          legend_toggle
          chartEvents={this.chartEvents}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dates: state.dates.dateArray,
    date: state.date,
    visibility: state.dates.visibility
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectDate: (data) => {
      dispatch(selectDate(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(YearlyCalendar);