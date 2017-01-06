import ReducedAction from 'reduced-actions-redux';

module.exports = [
  {
    name: 'FETCH_SERVERS',
    dependencies: ['servers'],
    resolver: function (action, dispatch){
        this.servers.find().then(d => {
            dispatch(new ReducedAction(
              action.type,
              'servers.all_servers',
              d.data
            ));
        });
    }
  },
  {
    name: 'ADD_SERVER',
    dependencies: ['servers'],
    resolver: function (action, dispatch){
        this.servers.create(action.context)
        .then(s => {
            dispatch(new ReducedAction(
              action.type,
              'servers.all_servers',
              all => [...all, Object.assign({}, s)]
            ))
        })
        .catch(e => {
          console.log(e.message);
        });
    }
  },
  {
    name: 'FETCH_KEYS',
    dependencies: ['keys'],
    resolver: function (action, dispatch){
        this.keys.find().then(d => {
            dispatch(new ReducedAction(
              action.type,
              'servers.key_files',
              d
            ));
        });
    }
  },
  {
    name: 'AUTHENTICATE',
    dependencies: ['login'],
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
                error: false
              }
            ));
        })
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
