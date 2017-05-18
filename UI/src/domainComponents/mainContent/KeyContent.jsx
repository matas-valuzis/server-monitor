import React, {Component} from 'react';
import ItemEditList from '../../components/lists/ItemEditList.jsx';
import Dropzone from 'react-dropzone';
import md5 from 'md5';

export default class KeyContent extends Component {

    onKeyDelete = (e, key) => {
        e.preventDefault();
        this.props.onDelete(key.name);
    };

    onDrop = (accepted, rejected) => {
        if (rejected.length){
            this.props.onReject(rejected[0]);
        }
        if (accepted.length){
            this.props.onUpload(accepted[0]);
        }
    };

    render() {
        const dropText = <div>
            <center>
                <h3>Drag and drop key file</h3>
                <h5 className="error">{this.props.upload_error}</h5>
            </center>
        </div>;
        const success = this.props.uploaded ? 'Key has been added!' : '';
        const keys = this.props.keys.map(k => {return {id: md5(k), name: k}});
        const keyList = <ItemEditList
            items={keys}
            labelResolver={l => l.name}
            actionResolver={l => {
                return [<span><button className="btn btn-primary" onClick={(e) => this.onKeyDelete(e, l)}>Remove</button></span>]
            }}
        />;
        return (
            <div className="log-module">
                <h1>Keys</h1>
                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Identity files</h4>
                    </div>
                    <div className="card-block">
                        {keyList}
                    </div>

                </div>

                <div className="card">
                    <div className="card-block">
                        <h4 className="card-title">Add new identity files</h4>
                        <h6 className="card-title success">{success}</h6>
                    </div>
                    <div className="card-block">
                        <Dropzone
                            onDrop={this.onDrop}
                            disablePreview={true}
                            multiple={false}
                            maxSize={1024*5}
                        >
                            {dropText}
                        </Dropzone>
                    </div>

                </div>
            </div>
        );
    }
}
