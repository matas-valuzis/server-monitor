import ReducedAction from 'reduced-actions-redux';


module.exports = [
    {
        name: 'ERROR',
        dependencies: ['changePathAction'],
        resolver: function (action, dispatch){
            const error = action.context;
            switch (error.name){
                case 'NotAuthenticated':
                    dispatch(this.changePathAction('/login'));
                    break;
                case 'NewServerCreationFailed':
                    dispatch(new ReducedAction('SERVER_CREATION_ERROR', 'servers.new_server.error', error.message));
                    break;
                default:
                    console.log(error);
            }
        }
    },

];
