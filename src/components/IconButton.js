import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../utils';

const IconButton = ({
  containerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  icon,
  iconStyle,
  tintColor = '#000',
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: COLORS.primary,
        ...containerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Image
        style={{width: 30, height: 30, tintColor: COLORS.white, ...iconStyle}}
        source={icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default IconButton;
