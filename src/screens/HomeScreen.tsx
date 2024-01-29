import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import type {RootState} from '../store/store';
import EncryptedStorage from 'react-native-encrypted-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {addBalance, subBalance, addTransaction} from '../store/accountSlice';
import {CardView, ServiceView, TransactionHistoryView} from '../components';
import {COLORS} from '../utils';
import {DATA_MOCK_TRANSACTION} from '../utils/constants';

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

  const transactionListData = useSelector(
    (state: RootState) => state.account?.transactionData,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('transactionListData: ', transactionListData);
    if (transactionListData.length === 0) {
      dispatch(
        addTransaction({
          transactionData: DATA_MOCK_TRANSACTION,
          forceRefreshUpdate: true,
        }),
      );
    }
  }, []);

  // const [transactionListData, setTransactionListData] = useState([]);

  // console.log('transactionListData: ', transactionListData);

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
          marginBottom: 10,
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
