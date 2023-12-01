import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextButton, FormInput, IconButton} from '../components';
import {SIZES, COLORS, images, icons} from '../utils';

const LoginScreen = ({navigation}) => {
  // States
  const [mode, setMode] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const renderSignIn = () => {
    return (
      <View style={{marginTop: SIZES.padding, height: SIZES.height * 0.55}}>
        <Shadow>
          <View style={styles.authContainer}>
            <Text
              style={{
                lineHeight: 45,
                color: COLORS.dark,
                fontSize: 36,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              My Bank
            </Text>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              extraScrollHeight={-300}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
              }}>
              {/* Email */}
              <FormInput
                containerStyle={{
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                value={email}
                placeholder="Email"
                prependComponent={
                  <Image
                    source={icons.email}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                }
                onChange={text => setEmail(text)}
              />

              {/* Password */}
              <FormInput
                containerStyle={{
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.error,
                }}
                placeholder="Password"
                value={password}
                prependComponent={
                  <Image
                    source={icons.lock}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: SIZES.base,
                    }}
                  />
                }
                secureTextEntry={!isVisible}
                onChange={text => setPassword(text)}
                appendComponent={
                  <IconButton
                    icon={isVisible ? icons.eye_off : icons.eye}
                    iconStyle={{
                      tintColor: COLORS.grey,
                    }}
                    onPress={() => setIsVisible(!isVisible)}
                  />
                }
              />
              <View style={{alignItems: 'flex-end'}}>
                <TextButton
                  label="Forgot Password?"
                  contentContainerStyle={{
                    marginTop: SIZES.radius,
                    backgroundColor: 'null',
                  }}
                  labelStyle={{
                    color: COLORS.support3,
                    fontWeight: '700',
                  }}
                />
              </View>
            </KeyboardAwareScrollView>

            <TextButton
              label="Log In"
              contentContainerStyle={{
                height: 55,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
              labelStyle={{
                // ...FONTS.h3,
                fontSize: 18,
                fontWeight: '700',
              }}
              onPress={() => navigation.navigate('MainTab')}
            />
          </View>
        </Shadow>
      </View>
    );
  };

  // Render
  const renderAuthContainer = () => {
    if (mode === 'signIn') {
      return renderSignIn();
    }
  };

  const renderAuthContainerFooter = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginTop: -30,
          marginHorizontal: SIZES.radius,
          paddingBottom: SIZES.radius,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          backgroundColor: COLORS.light60,
          zIndex: 0,
        }}>
        <Text
          style={{
            color: COLORS.grey,
            // ...FONTS.body5,
          }}>
          {mode === 'signIn'
            ? "Don't have an account?"
            : 'I already have an account'}
        </Text>
        <TextButton
          label={mode === 'signIn' ? 'Create New Account' : 'Sign In'}
          contentContainerStyle={{
            marginLeft: SIZES.base,
            backgroundColor: null,
          }}
          labelStyle={{
            color: COLORS.support3,
            // ...FONTS.h5,
          }}
        />
      </View>
    );
  };

  const renderSocialLogins = () => {
    return (
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: -30,
          zIndex: -1,
        }}>
        <Text
          style={{
            color: COLORS.dark,
            // ...FONTS.body3,
            textAlign: 'center',
          }}>
          OR login with
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
          }}>
          <IconButton
            icon={icons.twitter}
            iconStyle={{
              tintColor: COLORS.dark,
            }}
            containerStyle={styles.socialButtonContainer}
          />
          <IconButton
            icon={icons.google}
            iconStyle={{
              tintColor: COLORS.dark,
            }}
            containerStyle={{
              ...styles.socialButtonContainer,
              marginLeft: SIZES.radius,
            }}
          />
          <IconButton
            icon={icons.linkedin}
            iconStyle={{
              tintColor: COLORS.dark,
            }}
            containerStyle={{
              ...styles.socialButtonContainer,
              marginLeft: SIZES.radius,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.lightGrey,
      }}>
      {/* Logo */}
      <Image
        source={images.logo}
        style={{
          alignSelf: 'center',
          marginTop: SIZES.padding * 2,
          width: 50,
          height: 50,
        }}
      />
      {/* Auth Container */}
      <View
        style={{
          zIndex: 1,
        }}>
        {renderAuthContainer()}
      </View>

      {renderAuthContainerFooter()}

      {mode === 'signIn' && renderSocialLogins()}
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    width: SIZES.width - SIZES.padding * 2,
    padding: SIZES.padding,
    // paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.light,
    zIndex: 1,
  },
  socialButtonContainer: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.grey20,
  },
});

export default LoginScreen;
