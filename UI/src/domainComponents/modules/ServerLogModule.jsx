import React, {Component} from 'react';
import LinkList from '../../components/lists/LinkList.jsx';

export default class ServerLogModule extends Component {
    render() {
        const logContainers = this.props.logs.map(l => {
            return (
                <div key={l.id} className="log">
                    <h6>{l.log_name}</h6>
                    <h6>File: {l.log_path}</h6>
                    <code>{l.lines.map((line, i) => <p key={i}>{line}</p>)}</code>
                </div>
            )
        });
        return (
            <div className="server-logs">
                {logContainers}
            </div>
        );
    }
}

