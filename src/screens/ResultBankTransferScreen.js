import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../utils';
import DashedLine from 'react-native-dashed-line';
import {IconArrowRight} from '../components';
import moment from 'moment/moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ResultBankTransferScreen = ({navigation, route}) => {
  console.log('route.params: ', route.params);

  const [dataTransfer, setDataTransfer] = useState(null);

  useEffect(() => {
    console.log(
      '--------------------transferInfoData: ',
      route.params?.transferInfoData,
    );
    if (route.params?.transferInfoData) {
      console.log('transferInfoData: ', route.params?.transferInfoData);
      setDataTransfer(route.params.transferInfoData);
    }
  }, []);

  const onCancel = () => {
    navigation.goBack();
  };

  console.log('dataTransfer: ', dataTransfer);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <IconArrowRight
            color={'black'}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Invoice Information</Text>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <Text style={styles.txtCancel}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={-300}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: SIZES.padding * 2,
        }}>
        <View style={styles.wrapperContent}>
          <View style={styles.wrapperContentHeader}>
            <Text style={styles.txtResult}>
              Successful money transfer transaction
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 110,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.dark80,
              }}>
              Amount Transferred
            </Text>
            <Text style={{marginVertical: 5}}>
              {moment().format('DD/MM/YYYY, HH:mm')}
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: COLORS.dark80,
              }}>
              {dataTransfer?.amount || ''}
            </Text>
          </View>
          <View style={{marginHorizontal: 10}}>
            <DashedLine
              dashLength={10}
              dashThickness={4}
              dashGap={10}
              dashColor={COLORS.grey80}
            />
          </View>

          <View style={styles.itemInfo}>
            <Text style={styles.txtFrom}>FROM</Text>
            <View>
              <Text style={styles.txtAccountName}>NGUYEN QUOC VIET</Text>
              <Text style={styles.txtBank}>MyBank</Text>
              <Text style={styles.txtAccountNumber}>999999999</Text>
            </View>
          </View>

          <View style={styles.line} />
          <View style={styles.itemInfo}>
            <Text style={styles.txtFrom}>TO</Text>
            <View>
              <Text style={styles.txtAccountName}>
                {dataTransfer?.accountName.toUpperCase()}
              </Text>
              <Text style={styles.txtBank}>{dataTransfer?.bankName}</Text>
              <Text style={styles.txtAccountNumber}>
                {dataTransfer?.accountNumber}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={[styles.itemInfo]}>
            <Text style={styles.txtFrom}>Note</Text>
            <View style={{marginLeft: 0}}>
              <Text style={styles.txtBank}>{dataTransfer?.note}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('HomeScreen')}
          style={[styles.btn, {backgroundColor: COLORS.support5}]}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  txtCancel: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  btn: {
    height: 60,
    borderRadius: 6,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  wrapperContent: {
    height: 440,
    // width: '100%',
    margin: 20,
    borderRadius: 10,
    // borderWidth: 1,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'green',
  },
  wrapperContentHeader: {
    height: 36,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: 'green',
  },
  txtResult: {
    color: 'white',
    fontSize: 14,
  },
  itemInfo: {
    flexDirection: 'row',
    height: 90,
    // justifyContent: 'spa',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  txtFrom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark60,
    marginHorizontal: 30,
    width: '15%',
  },
  txtAccountName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark80,
  },
  txtBank: {
    fontSize: 16,
    color: COLORS.dark60,
    width: '99%',
  },
  txtAccountNumber: {
    fontSize: 16,
    color: COLORS.dark60,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.dark20,
    marginHorizontal: 20,
  },
});

export default ResultBankTransferScreen;
