import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default class OneLineChart extends Component {
  render() {
    let dataLabel = this.props.dataLabel || 'value';
    let chartData = this.props.data.map(d => {
        let point = {name: d.x};
        point[dataLabel] = d.y;
        return point;
    });
    let minValue = this.props.minValue || 0;
    let maxValue = this.props.maxValue || 'auto';
    let valueFormater = this.props.valueFormater || (t => t);
    let argumentFormater = this.props.argumentFormater || (t => t);
    return (
      <div className="chart">
        <h1>{this.props.header}</h1>
        <ResponsiveContainer width="80%" height="80%">
            <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                <Line
                    type="monotone"
                    dataKey={dataLabel}
                    stroke="#8884d8"
                    dot={false}
                />
                <CartesianGrid stroke="#ccc" />
                <YAxis
                    domain={[minValue, maxValue]}
                    tickFormatter={valueFormater}
                />
                <XAxis
                    interval="0"
                    dataKey="name"
                    scale="utcTime"
                    tickFormatter={argumentFormater}
                />
                <Tooltip
                    formatter={valueFormater}
                    labelFormatter={argumentFormater}
                />
            </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
