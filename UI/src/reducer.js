
let mainReducer = (defaultStore) => {
  return (store, action) => {

    return store || defaultStore;
  };
};
module.exports = mainReducer;
