import {Chart} from 'react-google-charts';
import React from 'react'
import {connect} from 'react-redux'

class YearlyCalendar extends React.Component {

  render() {
    console.log(this.props.dates);

    const columns = [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]

    return (
      <Chart
        chartType="Calendar"
        columns={columns}
        rows={this.props.dates}
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

export default connect(mapStateToProps)(YearlyCalendar);
