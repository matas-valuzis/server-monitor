import React, {Component} from 'react';
import OneLineChart from '../../components/charts/OneLineChart.jsx';
import ChartContainer from '../../components/charts/ChartContainer.jsx';
import dateformat from 'dateformat';

export default class ServerDiskModule extends Component {
    render() {
        const spaceData = this.props.disk.map(d => ({
            x: d.createdAt,
            y: d.used_space
        }));
        const inodeData = this.props.disk.map(d => ({
            x: d.createdAt,
            y: d.used_inodes
        }));
        const timeTabs = [
            {id: 0, name: "Today"},
            {id: 1, name: "This week"},
            {id: 2, name: "This month"},
            {id: 3, name: "This year"},
        ];

        const spaceChart = (
            <OneLineChart
                data={spaceData}
                valueFormater={b => Math.round(b / (1024*1024)) + ' GB'}
                argumentFormater={d => dateformat(d, 'HH:MM')}
            />
        );

        const inodeChart = (
            <OneLineChart
                data={inodeData}

            />
        );

        return (
            <div className="server-disk">
                <div className="card">
                    <div className="card-block">
                        <ChartContainer
                            onTabClick={this.props.onDiskTabSelect}
                            header="Used disk space"
                            tabs={timeTabs}
                            current={{id: this.props.diskTime, content: spaceChart}}
                        />
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <ChartContainer
                            onTabClick={this.props.onInodeTabSelect}
                            header="Used inodes"
                            tabs={timeTabs}
                            current={{id: this.props.inodeTime, content: inodeChart}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

