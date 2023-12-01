import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Svg, Defs, Rect, Mask} from 'react-native-svg';
import {TextButton, IconButton} from '../components';
import {COLORS, SIZES, icons, constants, images} from '../utils';

const ScanQRScreen = ({navigation}) => {
  // State
  const [isLoading, setIsLoading] = useState(false);

  // Barcode
  const [barcode, setBarcode] = useState('');
  const [isScanned, setIsScanned] = useState(false);

  const device = useCameraDevice('back');

  // Permission Camera
  useEffect(() => {
    requestCameraPermission();
  }, []);

  // const toggleActiveState = async () => {
  //   if (barcodes && barcodes.length > 0 && isScanned === false) {
  //     setIsScanned(true);
  //     // console.log('barcodes: ', JSON.stringify(barcodes));
  //     barcodes.forEach(async scannedBarcode => {
  //       // console.log('scannedBarcode: ', scannedBarcode);
  //       if (scannedBarcode.rawValue !== '') {
  //         setBarcode(scannedBarcode.rawValue);
  //         console.log('scannedBarcode.rawValue: ', scannedBarcode.rawValue);
  //         console.log(
  //           'constants.HEROKU_LINK: ',
  //           `${constants.HEROKU_LINK}decode-vietqr`,
  //         );
  //         setIsLoading(true);
  //         fetch(
  //           // 'https://viet-nguyen-server.herokuapp.com/api/v1/decode-vietqr',
  //           `${constants.HEROKU_LINK}decode-vietqr`,
  //           {
  //             method: 'POST',
  //             headers: {
  //               Accept: 'application/json',
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               content: scannedBarcode.value,
  //             }),
  //           },
  //         )
  //           .then(response => response.json())
  //           .then(json => {
  //             console.log('json: ', json);
  //             console.log(
  //               'json.data.consumer.bankBin: ',
  //               json.data.consumer.bankBin,
  //             );
  //             console.log(
  //               'json.data.consumer.bankNumber: ',
  //               json.data.consumer.bankNumber,
  //             );
  //             navigation.navigate('BankTransfer', {
  //               bankBin: json.data.consumer.bankBin,
  //               bankNumber: json.data.consumer.bankNumber,
  //               purpose: json.data.additionalData.purpose,
  //               amount: json.data.amount,
  //             });
  //             // return json;
  //             setIsLoading(false);
  //           })
  //           .catch(error => {
  //             console.error(error);
  //             setIsLoading(false);
  //           });

  //         // productAnimationState.transitionTo('show');
  //       }
  //     });
  //   }
  // };

  // Handler
  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log('codes: ', codes);
      console.log(`Scanned ${codes.length} codes!`);
      if (codes.length > 0 && isScanned === false) {
        setIsScanned(true);
        codes.forEach(async scannedBarcode => {
          if (scannedBarcode.value !== '') {
            console.log('scannedBarcode.value: ', scannedBarcode.value);
            console.log('constants.HEROKU_LINK: ', `${constants.HEROKU_LINK}`);
            setIsLoading(true);
            console.log('setIsLoading(true);');
            fetch(
              // 'https://viet-nguyen-server.herokuapp.com/api/v1/decode-vietqr',
              constants.HEROKU_LINK,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  content: scannedBarcode.value,
                }),
              },
            )
              .then(response => response.json())
              .then(json => {
                console.log('json: ', json);
                console.log(
                  'json.data.consumer.bankBin: ',
                  json.data.consumer.bankBin,
                );
                console.log(
                  'json.data.consumer.bankNumber: ',
                  json.data.consumer.bankNumber,
                );
                navigation.navigate('TransferScreen', {
                  bin: json.data.consumer.bankBin,
                  bankNumber: json.data.consumer.bankNumber,
                  purpose: json.data.additionalData.purpose,
                  amount: json.data.amount,
                });
                // return json;
                setIsLoading(false);
                setIsScanned(false);
              })
              .catch(error => {
                console.error(error);
                setIsLoading(false);
                setIsScanned(false);
              });
          }
        });
      }
    },
  });

  const CameraFrame = () => {
    return (
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />
            <Rect height="250" width="250" fill="black" x="18%" y="15%" />
          </Mask>
        </Defs>
        <Rect
          height="100%"
          width="100%"
          fill="rgba(0, 0, 0, 0.4)"
          mask="url(#mask)"
        />
        {/* Frame Border */}
        <Rect
          x="18%"
          y="15%"
          width="250"
          height="250"
          strokeWidth="5"
          stroke={COLORS.success}
          fill="rgba(0, 0, 0, 0.1)"
        />
      </Svg>
    );
  };

  const renderCamera = () => {
    if (device == null) {
      return (
        <View style={{flex: 1}}>
          <Text> Device not found</Text>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />

          {/* QR Code */}

          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                // zIndex: 1,
              }}>
              {/* Close */}
              <IconButton
                label="Close"
                onPress={() => navigation.goBack()}
                icon={icons.close}
              />

              {/* Add. option */}
              <IconButton icon={icons.flash} />
              <IconButton
                icon={icons.question_mark}
                containerStyle={{
                  marginLeft: SIZES.base,
                }}
              />
            </View>
            <CameraFrame />

            {/* Label 1 */}
            <View
              style={{
                position: 'absolute',
                top: '10%',
                left: 0,
                right: 0,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // ...FONTS.h1,
                  fontSize: 26,
                  color: COLORS.light,
                }}>
                Scan...
              </Text>
            </View>

            <View
              style={{
                position: 'absolute',
                top: SIZES.height * 0.3 + 200,
                left: -10,
                right: 0,
                alignItems: 'center',
                alignSelf: 'center',
                // backgroundColor: 'red',
                justifyContent: 'center',
              }}>
              <Image
                style={styles.iconProvider}
                source={images.IconVietQRNapasVN}
                resizeMode="stretch"
              />
            </View>

            {/* Label 2 */}
            <View
              style={{
                position: 'absolute',
                top: SIZES.height * 0.4 + 220,
                left: 0,
                right: 0,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // ...FONTS.body3,
                  color: COLORS.light,
                }}>
                Align the code to be in the middle of the box
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };

  const loadingView = () => {
    return (
      <View
        style={[
          {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.dark80,
          },
        ]}>
        <ActivityIndicator color={'rgba(123, 96, 238, 1)'} size="large" />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Camera */}
      {renderCamera()}
      {isLoading && loadingView()}
    </View>
  );
};

const styles = StyleSheet.create({
  iconProvider: {
    marginTop: 16,
    height: 34,
    width: 278,
    borderRadius: 6,
  },
});

export default ScanQRScreen;
