import ReducedAction from 'reduced-actions-redux';

module.exports = [
    {
        name: 'AUTHENTICATE',
        dependencies: ['login', 'changePathAction'],
        resolver: function (action, dispatch){
            this.login(action.context.email, action.context.pass)
                .then(() => {
                    dispatch(new ReducedAction(
                        'SET_AUTHENTICATION_SUCCESS',
                        'authentication',
                        {
                            email: action.context.email,
                            password: '',
                            authenticated: true,
                            error: ''
                        }
                    ));
                })
                .then(() => dispatch(this.changePathAction('/dashboard')))
                .catch((e) => {
                    console.log(e);
                    dispatch(new ReducedAction(
                        'SET_AUTHENTICATION_ERROR',
                        'authentication',
                        {
                            email: action.context.email,
                            password: "",
                            authenticated: false,
                            error: e.message
                        }
                    ));
                });
        }
    },

];
