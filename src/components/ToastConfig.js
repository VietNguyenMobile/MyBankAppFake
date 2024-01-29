import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ErrorToast,
  SuccessToast,
  ToastConfigParams,
} from 'react-native-toast-message';
import {COLORS, constants, images} from '../utils';

export const toastConfig: ToastConfigParams = {
  success: () => null,
  error: props => (
    <ErrorToast
      {...props}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.title}
      text2Style={styles.subTitle}
      style={{
        borderLeftColor: COLORS.error,
      }}
    />
  ),
  successCustom: props => (
    <SuccessToast
      {...props}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.title}
      text2Style={styles.subTitle}
      style={{
        borderLeftColor: COLORS.green,
        height: 120,
      }}
      text2NumberOfLines={4}
    />
  ),
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.support5,
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.dark,
    // borderWidth: 1,
  },
  toastContainer: {paddingHorizontal: 12},
});
