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
    let index = Chart.chart.getSelection()[0].row
    console.log('chart selection', Chart.chart.getSelection())

    if (index !== undefined) {
      this.props.selectDate(this.props.dates[index])
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

    if (this.props.dates[0].date.getYear() == 1) {
      return (<div></div>)
    }

    return (
      <div className='calendar-component' style={{visibility: this.props.visibility}}>
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
