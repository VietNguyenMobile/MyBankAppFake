import React, {useEffect, useState, useCallback, useMemo} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import {useNavigation} from '@react-navigation/native';
import {IconArrowRight, IconSearch, DismissKeyBoard} from '../components';
import {COLORS} from '../utils';

export interface itemBank {
  id: Number;
  name: String;
  code: String;
  bin: String;
  shortName: String;
  logo: String;
  transferSupported: Number;
  lookupSupported: number;
}

const BankListScreen = ({navigation}) => {
  const [dataBank, setDataBank] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // const navigation = useNavigation();

  useEffect(() => {
    const getBankList = async () => {
      try {
        console.log('aaa');
        const response = await fetch('https://api.vietqr.io/v2/banks', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        console.log('response: ', response);
        const jsonData = await response.json();
        setDataBank(jsonData.data);
        setIsLoading(false);
      } catch (error) {
        console.log('error: ', error);
        setIsLoading(false);
      }
    };

    getBankList();
  }, []);

  const handleOnItem = (item: itemBank) => {
    console.log('item: ', item);
    navigation.navigate('TransferScreen', {
      bin: item.bin,
      bankNumber: null,
      purpose: null,
      amount: null,
    });
  };

  const _renderItem = ({item}: {item: itemBank}) => {
    return (
      <Pressable style={styles.item} onPress={() => handleOnItem(item)}>
        <FastImage
          style={{
            width: 80,
            height: 80,
            backgroundColor: COLORS.white,
            borderRadius: 10,
            marginLeft: 10,
          }}
          source={{
            uri: item.logo,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            {item.shortName}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#333',
              marginTop: 5,
            }}>
            {item.name}
          </Text>
        </View>

        <IconArrowRight />
      </Pressable>
    );
  };

  const onChangeSearch = useCallback(
    value => {
      setSearchInput(value);
    },
    [searchInput],
  );

  const onRenderEmptyList = useMemo(
    () => (
      <View style={styles.emptyView}>
        <Text>Không tìm thấy</Text>
      </View>
    ),
    [],
  );

  const renderList = useMemo(() => {
    if (isLoading) {
      return (
        <View style={styles.footerListView}>
          <ActivityIndicator color={'rgba(123, 96, 238, 1)'} size="large" />
        </View>
      );
    }

    const dataFilter = dataBank.filter(bank => {
      return bank.shortName.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (dataFilter.length <= 0) {
      return onRenderEmptyList;
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <DismissKeyBoard>
          <FlatList
            keyboardDismissMode="on-drag"
            data={dataFilter}
            initialNumToRender={dataFilter.length}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
          />
        </DismissKeyBoard>
      </KeyboardAvoidingView>
    );
  }, [searchInput, dataBank, isLoading]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          color: COLORS.support5,
          textAlign: 'center',
          margin: 10,
        }}>
        List Bank
      </Text>
      <View style={styles.searchInput}>
        <IconSearch />
        <TextInput
          style={styles.searchInputText}
          value={searchInput}
          onChangeText={onChangeSearch}
          placeholder={'Input name of bank'}
          placeholderTextColor={'#AAA'}
          autoCorrect={false}
        />
      </View>
      {renderList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary08,
  },
  searchInput: {
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerListView: {
    width: '100%',
    paddingTop: 10,
  },
});

export default BankListScreen;
