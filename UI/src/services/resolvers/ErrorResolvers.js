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
                default:
                    console.log(error);
            }
        }
    },

];
