import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  FlatList,
  SectionList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils';

function formatCurrency(numberValue) {
  // Convert the number to a string
  const numberString = numberValue.toString();

  // Add commas to the string
  const formattedString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedString;
}

const DATA = [
  {
    title: '20/11/2023',
    data: [
      {
        isInCome: false,
        nameTraction: 'SHOPEEPAY JOINT STOCK',
        amount: 2000000,
        note: 'NAP VI SHOPEEPAY',
      },
      {
        isInCome: true,
        nameTraction: 'Incoming money',
        amount: 300000000,
        note: 'Thanh Toan',
      },
    ],
  },
  {
    title: '18/11/2023',
    data: [
      {
        isInCome: false,
        nameTraction: 'SHOPEEPAY JOINT STOCK',
        amount: 3704000,
        note: 'NAP VI SHOPEEPAY',
      },
      {
        isInCome: true,
        nameTraction: 'Incoming money',
        amount: 900000000,
        note: 'Sent by me',
      },
    ],
  },
];

const TransactionHistoryView = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.item}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name={item.isInCome ? 'bank-transfer-in' : 'bank-transfer-out'}
                color={item.isInCome ? 'green' : COLORS.dark}
                size={28}
              />
              <View style={{marginBottom: 10, marginLeft: 10}}>
                <Text style={styles.title}>{item.nameTraction}</Text>
                <Text style={styles.note}>{item.note}</Text>
              </View>
            </View>
            <Text
              style={[
                styles.amount,
                {color: item.isInCome ? 'green' : COLORS.dark},
              ]}>{`${item.isInCome ? '+' : '-'}${formatCurrency(
              item.amount,
            )}`}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // height: height * 0.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width,
    marginTop: 20,
    padding: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: COLORS.grey,
  },
  amount: {
    fontSize: 18,
    textAlign: 'right',
  },
});

export default TransactionHistoryView;
