import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS, SIZES, icons, formatCurrency} from '../utils';
import moment from 'moment';
import {addBalance, subBalance, addTransaction} from '../store/accountSlice';
import {IconArrowRight, Loading} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const mockData = {
  amount: 200000000,
  accountName: 'Nguyen Quoc Viet',
  accountNumber: '8007041110402',
  bankName: 'Bản Việt',
  note: 'Chuyen tien choi',
};

const ConfirmBankTransferScreen = ({navigation, route}) => {
  console.log('ConfirmBankTransferScreen route.params: ', route.params);
  const balanceNumber = useSelector(
    (state: RootState) => state.account?.accountBalance,
  );

  const dispatch = useDispatch();

  const accountNumber = useSelector(
    (state: RootState) => state.account?.accountNumber,
  );
  const accountName = useSelector(
    (state: RootState) => state.account?.accountName,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [dataTransfer, setDataTransfer] = useState(null);

  useEffect(() => {
    if (route.params?.transferInfoData) {
      setDataTransfer(route.params?.transferInfoData);
    } else {
      setDataTransfer(mockData);
    }
  }, []);

  const funcCheckBiometric = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const result = await rnBiometrics.isSensorAvailable();
      console.log('result: ', result);

      if (result.available) {
        let epochTimeSeconds = Math.round(
          new Date().getTime() / 1000,
        ).toString();
        let payload = epochTimeSeconds + 'message';
        console.log('payload: ', payload);
        // const resultSignature = await rnBiometrics.createSignature({
        //   promptMessage: 'Confirm Transaction',
        //   payload: payload,
        // });

        rnBiometrics
          .simplePrompt({promptMessage: 'Confirm fingerprint'})
          .then(resultObject => {
            console.log('resultObject: ', resultObject);
            const {success} = resultObject;

            if (success) {
              console.log('successful biometrics provided');
              // const dateToFormat = moment();
              // const transactionDataAdd = {
              //   isInCome: false,
              //   nameTraction: `To ${route.params?.transferInfoData.accountName}`,
              //   amount: parseInt(
              //     route.params?.transferInfoData?.amount.replace(/,/g, ''),
              //   ),
              //   note: route.params?.transferInfoData?.note,
              //   numberAccount: route.params?.transferInfoData?.accountNumber,
              //   dataBank: route.params?.transferInfoData?.bankData,
              //   date: dateToFormat.format('ddd, MMM D, YYYY h:mm A'),
              // };
              // console.log('transactionDataAdd: ', transactionDataAdd);
              // dispatch(
              //   addTransaction({
              //     transactionData: [transactionDataAdd],
              //     forceRefreshUpdate: false,
              //   }),
              // );
              // dispatch(
              //   subBalance(
              //     parseInt(
              //       route.params?.transferInfoData?.amount.replace(/,/g, ''),
              //     ),
              //   ),
              // );
              navigation.navigate('OTPVerification', {
                transferInfoData: route.params?.transferInfoData,
                // transferInfoData: mockData,
              });
            } else {
              console.log('user cancelled biometric prompt');
            }
          })
          .catch(() => {
            console.log('biometrics failed');
          });
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <IconArrowRight
            color={'black'}
            style={{transform: [{rotate: '180deg'}]}}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Confirm Transaction</Text>
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
        <View style={styles.wrapperAvailableAmount}>
          <Text>
            <Text style={styles.txtTitleAmount}>Available to spend: </Text>
            <Text style={styles.txtAvailableAmount}>
              {formatCurrency(balanceNumber)} VND
            </Text>
          </Text>
        </View>

        <View style={styles.wrapperInfo}>
          <View style={[styles.itemInfo, styles.itemInfoAmount]}>
            <Text style={styles.txtTitleAmountData}>Amount</Text>
            <Text style={styles.txtAmountData}>
              {formatCurrency(dataTransfer?.amount)}
            </Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.txtTitleData}>TO</Text>
            <Text style={styles.txtData}>{dataTransfer?.accountName}</Text>
          </View>

          <View style={styles.itemInfo}>
            <Text style={styles.txtTitleData}>Acount Number</Text>
            <Text style={styles.txtData}>{dataTransfer?.accountNumber}</Text>
          </View>

          <View style={styles.itemInfo}>
            <Text style={styles.txtTitleData}>Bank Name</Text>
            <Text style={styles.txtData}>{dataTransfer?.bankName}</Text>
          </View>

          <View style={styles.itemInfo}>
            <Text style={styles.txtTitleData}>Note</Text>
            <Text style={styles.txtData}>{dataTransfer?.note}</Text>
          </View>
        </View>

        <View
          style={{
            height: 60,
            // width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 8,
            marginHorizontal: 20,
            borderColor: COLORS.support5_08,
          }}>
          <Text style={[styles.txtTitleAmount, {color: COLORS.dark80}]}>
            Fast money transfer
          </Text>
          <Image
            style={{width: 120, height: 50, borderRadius: 8, top: -4}}
            source={icons.logoNapas247}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={funcCheckBiometric}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <Loading isLoading={isLoading} />
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
  txtTitleAmountData: {
    fontSize: 26,
    color: COLORS.support5,
  },
  txtAmountData: {
    fontSize: 20,
    color: COLORS.dark80,
    fontWeight: 'bold',
  },
  txtTitleData: {
    fontSize: 20,
    color: COLORS.support5,
  },
  txtData: {
    fontSize: 16,
    color: COLORS.dark80,
    fontWeight: 'bold',
  },
  wrapperInfo: {
    borderRadius: 8,
    margin: 20,
    shadowColor: COLORS.support5,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
  },
  itemInfoAmount: {
    height: 100,
    backgroundColor: COLORS.support5_08,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemInfo: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.support5_08,
    borderBottomWidth: 2,
  },
  btn: {
    height: 60,
    borderRadius: 6,
    backgroundColor: COLORS.support5,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  wrapperAvailableAmount: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.support5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleAmount: {
    fontSize: 16,
    color: 'white',
  },
  txtAvailableAmount: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
});

export default ConfirmBankTransferScreen;
