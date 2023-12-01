import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CardView, ServiceView, TransactionHistoryView} from '../components';
import {COLORS} from '../utils';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.viewBell}>
        <MaterialCommunityIcons
          name="bell-badge"
          color={COLORS.error}
          size={26}
        />
      </View>

      <CardView
        name={'Nguyen Quoc Viet'}
        current={24999823322}
        numberAccount={'8432112123'}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          marginLeft: 20,
          marginTop: 20,
          color: COLORS.support5,
        }}>
        Service
      </Text>
      <ServiceView />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          marginLeft: 20,
          marginTop: 20,
          color: COLORS.support5,
        }}>
        Transaction history
      </Text>
      <TransactionHistoryView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.support5_08,
  },
  viewBell: {
    borderWidth: 1,
    borderColor: COLORS.error60,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
