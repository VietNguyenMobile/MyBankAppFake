import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCameraPermission} from 'react-native-vision-camera';

import {COLORS} from '../utils';

const ServiceView = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const navigation = useNavigation();
  const handleService = name => {
    console.log('Service Name: ', name);
    if (name === 'List Bank') {
      navigation.navigate('ListBankScreen');
    } else if (name === 'Transfer') {
      navigation.navigate('TransferScreen');
    } else if (name === 'Your QR') {
      if (hasPermission) {
        navigation.navigate('ScanQR');
      } else {
        requestPermission();
      }
    }
  };

  const cardService = (iconName, serviceName) => {
    return (
      <Pressable
        onPress={() => handleService(serviceName)}
        style={styles.serviceView}>
        {iconName === 'bank-transfer' || iconName === 'bank' ? (
          <MaterialCommunityIcons
            name={iconName}
            color={COLORS.primary}
            size={36}
          />
        ) : (
          <Ionicons name={iconName} color={COLORS.primary} size={36} />
        )}
        <Text style={styles.serviceName}>{serviceName}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {cardService('bank-transfer', 'Transfer')}
      {cardService('card-outline', 'Cards')}
      {cardService('qr-code-outline', 'Your QR')}
      {cardService('bank', 'List Bank')}
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height * 0.1,
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.support5,
    marginTop: 20,
    backgroundColor: COLORS.support2_08,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtName: {
    fontSize: 22,
    color: COLORS.support5,
    textTransform: 'uppercase',
  },
  balanceNumber: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtNumberCurrent: {
    fontSize: 18,
    color: COLORS.support5,
    fontWeight: '700',
    marginRight: 10,
  },
  serviceView: {
    justifyContent: 'center',
    // borderWidth: 1,
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 14,
    color: COLORS.dark,
  },
});

export default ServiceView;
