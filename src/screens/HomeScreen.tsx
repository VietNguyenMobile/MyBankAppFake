import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {RootState} from '../store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {addBalance, subBalance} from '../store/accountSlice';
import {CardView, ServiceView, TransactionHistoryView} from '../components';
import {COLORS} from '../utils';

const HomeScreen = () => {
  const balanceNumber = useSelector(
    (state: RootState) => state.account?.accountBalance,
  );

  const accountNumber = useSelector(
    (state: RootState) => state.account?.accountNumber,
  );
  const accountName = useSelector(
    (state: RootState) => state.account?.accountName,
  );

  console.log('balanceNumber: ', balanceNumber);

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
        name={accountName}
        current={balanceNumber}
        numberAccount={accountNumber}
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
