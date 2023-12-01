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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../utils';

export function formatCurrency(numberValue) {
  // Convert the number to a string
  const numberString = numberValue.toString();

  // Add commas to the string
  const formattedString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedString;
}

const CardMainView = ({name, current, numberAccount}) => {
  const [isShowMoney, setIsShowMoney] = useState(true);

  const handleToggleShowMoney = () => {
    setIsShowMoney(!isShowMoney);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtName}>{name}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: height * 0.004,
        }}>
        <Text style={{fontSize: 14, fontWeight: '700'}}>Account Number: </Text>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{numberAccount}</Text>
      </View>

      <View style={styles.balanceNumber}>
        <Text style={{fontSize: 14, fontWeight: '700'}}>My Balance: </Text>
        <TextInput
          style={styles.txtNumberCurrent}
          value={`${formatCurrency(current.toString())} VND`}
          secureTextEntry={isShowMoney}
        />
        <Pressable onPress={handleToggleShowMoney}>
          <Ionicons
            name={isShowMoney ? 'eye' : 'eye-off'}
            size={20}
            color={COLORS.dark}
          />
        </Pressable>
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: height * 0.2,
    width: width * 0.9,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.support5,
    // marginTop: 20,
    padding: 20,
    backgroundColor: COLORS.support2_08,
    justifyContent: 'space-between',
  },
  txtName: {
    fontSize: 22,
    color: COLORS.support5,
    textTransform: 'uppercase',
  },
  balanceNumber: {
    // marginTop: height * 0.02,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtNumberCurrent: {
    fontSize: 18,
    color: COLORS.support5,
    fontWeight: '700',
    marginRight: 10,
  },
});

export default CardMainView;
