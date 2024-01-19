import React from 'react';
// import 'react-native-reanimated';
import {StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './src/store';
import Navigator from './src/navigation/navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <View style={styles.container}>
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
