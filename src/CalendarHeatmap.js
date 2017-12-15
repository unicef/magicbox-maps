import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

export default class HeatmapCalendar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      // Some dates to render in the heatmap
      values: [
        //sample hard coded data
        {
          date: new Date(2016, 0, 1)
        },
        {
          date: new Date(2016, 0, 2)
        },
        {
          date: new Date(2016, 0, 3)
        },
        {
          date: new Date(2016, 0, 4)
        },
        {
          date: new Date(2016, 0, 5)
        },
        {
          date: new Date(2016, 0, 6)
        },
        {
          date: new Date(2016, 0, 7)
        },
      ],
      numDays: 365
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(props) {
    let date = props.date.toString().split(' ')[2]
    console.log(props);
  }

  render() {
    return (

      <div style={{width: 700}}>
              <h3>2016</h3>
                <CalendarHeatmap
                    endDate={new Date('2016-12-31')}
                    numDays={this.state.numDays}
                    values={this.state.values}
                    onClick={this.onClick}
                />
            </div>
    );
  }
}