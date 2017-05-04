import React, {Component} from 'react';
import OneLineChart from '../../components/charts/OneLineChart.jsx';
import ChartContainer from '../../components/charts/ChartContainer.jsx';
import dateformat from 'dateformat';
export default class ServerComputingModule extends Component {
    render() {
        const cpuData = this.props.cpu_data.map(d => ({
            x: d.createdAt,
            y: d.used_cpu
        }));
        const ramData = this.props.ram_data.map(d => ({
            x: d.createdAt,
            y: d.used_ram
        }));
        const tasksData = this.props.task_data.map(d => ({
            x: d.createdAt,
            y: d.tasks
        }));

        const timeTabs = [
            {id: 0, name: "Today"},
            {id: 1, name: "This week"},
            {id: 2, name: "This month"},
            {id: 3, name: "This year"},
        ];
        const timeLabels = {
            0: d => dateformat(d, 'HH:MM'),
            1: d => dateformat(d, 'dddd'),
            2: d => dateformat(d, 'mm-dd'),
            3: d => dateformat(d, 'yyyy-mm-dd')
        };

        const cpuChart = (
            <OneLineChart
                dataLabel="CPU"
                data={cpuData}
                maxValue={100}
                minValue={0}
                argumentFormater={timeLabels[this.props.cpuTime]}
            />
        );

        const ramChart = (
            <OneLineChart
                dataLabel="RAM"
                minValue={0}
                data={ramData}
                valueFormater={b => Math.round(b / (1024*1024)) + ' MB'}
                argumentFormater={timeLabels[this.props.ramTime]}
            />
        );

        const taskChart = (
            <OneLineChart
                dataLabel="tasks"
                data={tasksData}
                argumentFormater={timeLabels[this.props.taskTime]}
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
                            current={{id: this.props.cpuTime, content: cpuChart}}
                        />
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <ChartContainer
                            onTabClick={this.props.onRamTabSelect}
                            header="Ram used"
                            tabs={timeTabs}
                            current={{id: this.props.ramTime, content: ramChart}}
                        />
                    </div>
                </div>
                <div className="card">
                    <div className="card-block">
                        <ChartContainer
                            onTabClick={this.props.onTaskTabSelect}
                            header="Number of tasks running"
                            tabs={timeTabs}
                            current={{id: this.props.taskTime, content: taskChart}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

