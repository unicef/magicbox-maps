import {Chart} from 'react-google-charts';
import React from 'react'
import {connect} from 'react-redux'
import {fetchDates} from './actions/datepicker.js'

class YearlyCalendar extends React.Component {

  componentDidMount() {
    console.log("fetching dates")
    this.props.fetchDates()
  }


  render() {
    console.log(this.props.dates);

    const columns = [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]

    return (
      <Chart
        chartType="Calendar"
        columns={columns}
        rows={this.props.dates.dateArray}
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

function mapStateToProps(state)  {
  return {
    dates: state.dates
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDates: (data) => {
      dispatch(fetchDates(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YearlyCalendar);
