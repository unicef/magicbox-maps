import {Chart} from 'react-google-charts';
import React from 'react'
import PropTypes from 'prop-types';

class YearlyCalendar extends React.Component {
  static propTypes = {
    onDateSelection: PropTypes.func
  }

  onChange = Chart => {
    const selectedDate = Chart.chart.getSelection()
    var date = selectedDate[0].date
    this.props.onDateSelection(date)
  }

  constructor(props){
    super(props)
    this.chartEvents=[
      {
        eventName : 'select',
        callback  : this.onChange.bind(this)
      }
    ]
  }

  render() {
    const {
      id,
      calendar: { rows, columns }
    } = this.props

    return (
      <Chart
        chartType="Calendar"
        columns={columns}
        rows={rows}
        options={{
          title: this.props.source,
          chartPackages: ['calendar'],
        }}
        width="1100px"
        legend_toggle
        chartEvents={this.chartEvents}
       />
    );
  }
}

export default YearlyCalendar;
