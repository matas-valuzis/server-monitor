import React, {Component} from 'react';
import LinkList from '../../components/lists/LinkList.jsx';

export default class ServerLogModule extends Component {
    render() {
        const logContainers = this.props.logs.map(l => {
            const err = l.error ? <h6> Error: <div className="error">{l.error}</div></h6> : '';
            return (
                <div key={l.id} className="log">
                    <h6>{l.log_name}</h6>
                    <h6>File: {l.log_path}</h6>
                    {err}
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

