import React, {Component} from 'react';
import OneLineChart from '../../components/charts/OneLineChart.jsx';
import ChartContainer from '../../components/charts/ChartContainer.jsx';
import dateformat from 'dateformat';
export default class ServerComputingModule extends Component {
    render() {
        const dataTableRows = this.props.computing.map((d, i) => {
            return (<tr key={i}>
                <td>{d.used_cpu}</td>
                <td>{d.used_ram}</td>
                <td>{d.tasks}</td>
            </tr>);
        });
        const cpuData = this.props.computing.map(d => ({
            x: dateformat(d.createdAt, 'yyyy-mm-dd HH:MM'),
            y: d.used_cpu
        }));
        const ramData = this.props.computing.map(d => ({
            x: dateformat(d.createdAt, 'yyyy-mm-dd HH:MM'),
            y: d.used_ram
        }));
        const tasksData = this.props.computing.map(d => ({
            x: dateformat(d.createdAt, 'yyyy-mm-dd HH:MM'),
            y: d.tasks
        }));

        const timeTabs = [
            {id: 0, name: "Today"},
            {id: 1, name: "This week"},
            {id: 2, name: "This month"},
            {id: 3, name: "This year"},
        ];

        const todayCpuChart = (
            <OneLineChart
                data={cpuData}
                maxValue={100}
                minValue={0}
            />
        );

        const todayRamChart = (
            <OneLineChart
                minValue={0}
                data={ramData}
                valueFormater={b => Math.round(b / (1024*1024)) + ' MB'}
            />
        );

        const todayTaskChart = (
            <OneLineChart
                data={tasksData}
            />
        );

        return (

            <div className="server-computing">
                <div className="card">
                    <div className="card-block">
                        <ChartContainer
                            onTabClick={this.props.onCpuTabSelect}
                            header="Cpu usage %"
                            tabs={timeTabs}
                            current={{id: this.props.cpuTime, content: todayCpuChart}}
                        />
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <ChartContainer
                            onTabClick={this.props.onRamTabSelect}
                            header="Ram used"
                            tabs={timeTabs}
                            current={{id: this.props.ramTime, content: todayRamChart}}
                        />
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <ChartContainer
                            onTabClick={this.props.onTaskTabSelect}
                            header="Number of tasks running"
                            tabs={timeTabs}
                            current={{id: this.props.taskTime, content: todayRamChart}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

