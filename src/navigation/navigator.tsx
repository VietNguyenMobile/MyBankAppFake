import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useCameraPermission} from 'react-native-vision-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import ListBankScreen from '../screens/ListBankScreen';
import TransferScreen from '../screens/TransferScreen';
import ScanQRScreen from '../screens/ScanQRScreen';
import ConfirmBankTransferScreen from '../screens/ConfirmBankTransferScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import ResultBankTransferScreen from '../screens/ResultBankTransferScreen';
import {COLORS} from '../utils';

const Tab = createBottomTabNavigator();

const renderIconTab = (name, color) => {
  let iconName = 'home';
  if (name === 'AccountScreen') {
    iconName = 'settings-sharp';
  } else if (name === 'HomeScreen') {
    iconName = 'home';
  } else {
    iconName = 'qr-code-outline';
  }
  return <Ionicons name={iconName} color={color} size={26} />;
};

function MyTabBar({state, descriptors, navigation}) {
  const {hasPermission, requestPermission} = useCameraPermission();
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        height: 50,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        console.log('options: ', options);
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        console.log('route: ', route);
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            console.log('route.name: ', route.name);
            if (route.name === 'ScanQR') {
              console.log('hasPermission: ', hasPermission);
              if (hasPermission) {
                navigation.navigate(route.name);
              } else {
                console.log('requestPermission');
                requestPermission();
              }
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const color = isFocused
          ? options.tabBarActiveTintColor
          : options.tabBarInactiveTintColor;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.key}
            activeOpacity={0.9}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: options.tabBarStyle.backgroundColor,
              paddingVertical: 4,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {renderIconTab(route.name, color)}
              <Text
                style={{
                  color: isFocused ? color : COLORS.white,
                  fontWeight: isFocused ? '700' : '500',
                  fontSize: 11,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {backgroundColor: COLORS.primary},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: COLORS.success,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        options={() => ({
          title: 'Home',
        })}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        // options={{
        //   title: 'Scan QR',
        //   tabBarIcon: ({color, size}) => (
        //     <Ionicons name="qr-code-outline" color={color} size={30} />
        //   ),
        // }}
        name="ScanQR"
        component={ScanQRScreen}
      />
      <Tab.Screen
        // options={{
        //   title: 'Account',
        //   tabBarIcon: ({color, size}) => (
        //     <Ionicons name="person" color={color} size={30} />
        //   ),
        // }}
        options={() => ({
          title: 'Profile',
        })}
        name="AccountScreen"
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="ListBankScreen" component={ListBankScreen} />
        <Stack.Screen name="TransferScreen" component={TransferScreen} />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
        />
        <Stack.Screen
          name="ConfirmBankTransfer"
          component={ConfirmBankTransferScreen}
        />
        <Stack.Screen
          name="ResultBankTransfer"
          component={ResultBankTransferScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
