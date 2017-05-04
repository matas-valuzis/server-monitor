import React, {Component} from 'react';
import LinkList from '../../components/lists/LinkList.jsx';

export default class ServerLogModule extends Component {
    render() {
        const logContainers = this.props.logs.map(l => {
            const err = l.error ? <h6> Error: <div className="error">{l.error}</div></h6> : '';
            return (
                <div className="card" key={l.id}>
                    <div className="card-block">
                        <h6 className="card-title">{l.log_name}</h6>
                        <h6 className="card-title">File: {l.log_path}</h6>
                        <div className="log">
                            {err}
                            <code className="log-lines">{l.lines.map((line, i) => <p key={i}>{line}</p>)}</code>
                        </div>
                    </div>
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

