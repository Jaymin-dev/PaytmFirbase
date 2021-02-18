import React from 'react';
import { } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigator'
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
