import React, {Component} from 'react';
import OneLineChart from '../../components/charts/OneLineChart.jsx';
import ChartContainer from '../../components/charts/ChartContainer.jsx';
import dateformat from 'dateformat';
import datefilter from '../../services/lib/datefilter';

export default class ServerDiskModule extends Component {
    render() {
        let spaceData = this.props.disk_data;
        let inodeData = this.props.inode_data;
        const timeTabs = [
            {id: 0, name: "Today"},
            {id: 1, name: "This week"},
            {id: 2, name: "This month"},
            {id: 3, name: "This year"},
        ];
        const timeLabels = {
            0: d => dateformat(d, 'HH:MM'),
            1: d => dateformat(d, 'dd'),
            2: d => dateformat(d, 'mm-dd'),
            3: d => dateformat(d, 'yyyy-mm-dd')
        };

        spaceData = spaceData.map(d => ({
            x: d.createdAt,
            y: d.used_space
        }));

        inodeData = inodeData.map(d => ({
            x: d.createdAt,
            y: d.used_inodes
        }));

        const spaceChart = (
            <OneLineChart
                data={spaceData}
                valueFormater={b => Math.round(b / (1024*1024)) + ' GB'}
                argumentFormater={timeLabels[this.props.diskTime]}
            />
        );

        const inodeChart = (
            <OneLineChart
                data={inodeData}
                valueFormater={b => Math.round(b / 1000) + 'K'}
                argumentFormater={timeLabels[this.props.inodeTime]}
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

