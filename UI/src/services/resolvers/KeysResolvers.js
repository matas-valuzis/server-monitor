import ReducedAction from 'reduced-actions-redux';
import {createUnresolvedAction as UA} from '../UnresolvedAction';

module.exports = [
    {
        name: 'SERVER_KEYS_SELECT',
        dependencies: ['changePathAction'],
        resolver: function (action, dispatch){
            dispatch(this.changePathAction('/dashboard/keys'));
        }
    },
    {
        name: 'DELETE_KEY',
        dependencies: ['keys'],
        resolver: function (action, dispatch){
            let key = action.context;
            this.keys.remove(key)
                .then(() => {
                    dispatch(new ReducedAction(
                        action.type,
                        'servers.key_files',
                        all => all.filter(k => k != key)
                    ));
                })
                .catch(e => {
                    dispatch(UA('ERROR', e));
                });
        }
    },
    {
        name: 'FETCH_KEYS',
        dependencies: ['keys'],
        resolver: function (action, dispatch){
            this.keys.find()
                .then(d => {
                    dispatch(new ReducedAction(
                        action.type,
                        'servers.key_files',
                        d
                    ));
                })
                .catch(e => {
                    dispatch(UA('ERROR', e));
                });
        }
    },
    {
        name: 'UPLOAD_KEY',
        dependencies: ['keys'],
        resolver: function (action, dispatch){
            const file = action.context;
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                let uploadContent = {
                    file_name: file.name,
                    data: btoa(reader.result)
                };
                this.keys.create(uploadContent)
                    .then(k => {
                        dispatch(new ReducedAction(
                            'ADD_NEW_KEY_FILE',
                            'servers.key_files',
                            files => [...files, k]
                        ));
                        dispatch(new ReducedAction(
                            'CLEAR_KEY_FILE_ERRORS',
                            'servers.new_key_file',
                            {uploaded: true, error: ''}
                        ));
                    })
                    .catch(e => {
                        dispatch(new ReducedAction(
                            'ADD_KEY_FILE_ERRORS',
                            'servers.new_key_file',
                            {uploaded: false, error: e.message}
                        ));
                    });
            };
        }
    },
];
