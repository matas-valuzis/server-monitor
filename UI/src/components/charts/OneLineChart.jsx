import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default class OneLineChart extends Component {
  render() {
    let chartData = this.props.data.map(d => ({name: d.x, value: d.y}));
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
                    dataKey="value"
                    stroke="#8884d8"
                    dot={false}
                />
                <CartesianGrid stroke="#ccc" />
                <YAxis
                    domain={[minValue, maxValue]}
                    tickFormatter={valueFormater}
                />
                <XAxis
                    dataKey="name"
                    scale="utcTime"
                    tickFormatter={argumentFormater}
                />
                <Tooltip/>
            </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
