import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import MockTestRoute from './src/config/routes';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <MockTestRoute />
    </Provider>
  );
};
export default App;
