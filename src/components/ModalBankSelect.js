import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useCallback, useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {itemBank} from '../screens/ListBankScreen';
import IconSearch from './IconSearch';
import DismissKeyBoard from './DismissKeyBoard';
import {COLORS, images} from '../utils';

interface ModalBankSelectType {
  isShow: Boolean;
  dataBank: Array[itemBank];
  onClose: () => {};
  onPressBank: (item: itemBank) => {};
}

const ModalBankSelect: React.FunctionComponent<ModalBankSelectType> = ({
  isShow,
  dataBank,
  onClose,
  onPressBank,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const onChangeSearch = useCallback(
    value => {
      setSearchInput(value);
    },
    [searchInput],
  );

  const _renderItem = ({item}: {item: itemBank}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPressBank(item);
          onClose();
        }}>
        <View style={styles.item}>
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
                marginTop: 10,
                width: '98%',
              }}>
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onRenderEmptyList = useMemo(
    () => (
      <View style={styles.emptyView}>
        <Text>Không tìm thấy</Text>
      </View>
    ),
    [],
  );

  const renderList = useMemo(() => {
    const dataFilter = dataBank.filter(bank => {
      return bank.shortName.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (dataFilter.length <= 0) {
      return onRenderEmptyList;
    }
    console.log('dataBank: ', dataBank);
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
            // ItemSeparatorComponent={() => {
            //   return <View style={{height: 1, backgroundColor: '#333'}} />;
            // }}
          />
        </DismissKeyBoard>
      </KeyboardAvoidingView>
    );
  }, [searchInput, dataBank]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {}}>
      <TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <View style={styles.wrapperTitle}>
            <View />
            <Text
              style={{
                fontSize: 20,
                color: 'rgba(123, 96, 238, 1)',
                textAlign: 'center',
                margin: 10,
              }}>
              List Bank
            </Text>
            <TouchableWithoutFeedback onPress={onClose}>
              <Image source={images.IconClose} style={styles.iconClose} />
            </TouchableWithoutFeedback>
          </View>

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
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '80%',
    width: '90%',
    backgroundColor: 'white',
    // alignSelf: 'center',
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 5,
    backgroundColor: COLORS.support1_08,
    // backgroundColor: 'red',
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 5,
    padding: 15,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  iconClose: {
    height: 26,
    width: 26,
  },
});

export default ModalBankSelect;
