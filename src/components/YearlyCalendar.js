import {Chart} from 'react-google-charts';
import React from 'react'
import {connect} from 'react-redux'
import {fetchDates} from '../actions/action-fetch-dates'

class YearlyCalendar extends React.Component {
  render = () => {
    const columns = [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]
    if (new Date(this.props.dates.dateArray).getYear() == 1) {
      return (<div></div>)
    }

    return (
      <div style={{visibility: this.props.visibility}}>
        <Chart

          chartType="Calendar"
          columns={columns}
          rows={this.props.dates}
          options={{
            title: this.props.source,
            chartPackages: ['calendar'],
          }}
          className='something'
          width='1100px'
          height='200px'
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
    visibility: state.dates.visibility
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(YearlyCalendar);
export default connect(mapStateToProps)(YearlyCalendar);
