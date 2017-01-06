import ReducedAction from './services/ReducedAction';

let mainReducer = (defaultStore) => {
  return (store, action) => {
    return defaultStore;
  };
}
module.exports = mainReducer;
