import React from 'react';
// import 'react-native-reanimated';
import {StyleSheet, View, Text} from 'react-native';
import Navigator from './src/navigation/navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
