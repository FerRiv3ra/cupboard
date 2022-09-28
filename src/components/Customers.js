import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Modal,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../styles/styles';
import User from './User';
import ModalNewUser from './ModalNewUser';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import ModalUser from './ModalUser';
import ModalNewDelivery from './ModalNewDelivery';
import useAppContext from '../hooks/useAppContext';

const Customers = () => {
  const [dataFilter, setDataFilter] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUser, setModalVisibleUser] = useState(false);
  const [modalCC, setModalCC] = useState(false);
  const [search, setSearch] = useState('');
  const [uid, setUid] = useState('');

  const {users, isLoading} = useAppContext();

  const handleNewUser = () => {
    setModalVisible(!modalVisible);
  };

  const resetState = () => {
    setModalVisibleUser(false);
    setModalCC(false);
    setUid('');
  };

  const goToCommunityCupboard = uid => {
    setUid(uid);
    setModalCC(true);
  };

  const handleSearch = txt => {
    setSearch(txt);

    setDataFilter(
      users.filter(
        us =>
          us.firstName.concat([' ', us.lastName]).includes(txt) ||
          us.customerId.toString() === txt,
      ),
    );
  };

  return (
    <View style={[globalStyles.flex, globalStyles.white]}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <Text style={[globalStyles.label, globalStyles.textCenter]}>
          VISITORS
        </Text>
      </Pressable>
      <TextInput
        style={[globalStyles.input, globalStyles.shadow, styles.input]}
        keyboardType="default"
        placeholder="Search"
        placeholderTextColor={'#666'}
        onChangeText={txt => handleSearch(txt)}
        value={search}
      />
      {isLoading ? (
        <ActivityIndicator animating={isLoading} size="large" />
      ) : (
        users.length === 0 && (
          <Text
            style={[
              globalStyles.label,
              globalStyles.textCenter,
              {fontSize: 12},
            ]}>
            There are visitors to show
          </Text>
        )
      )}
      <FlatList
        style={styles.list}
        data={search === '' ? users : dataFilter}
        keyExtractor={item => item.uid}
        renderItem={({item, index}) => {
          return (
            <User
              item={item}
              index={index}
              setModalVisible={setModalVisible}
              setModalVisibleUser={setModalVisibleUser}
              goToCommunityCupboard={goToCommunityCupboard}
            />
          );
        }}
      />
      <Modal visible={modalVisible} animationType="fade">
        <ModalNewUser setModalVisible={setModalVisible} />
      </Modal>
      <Modal animationType="slide" visible={modalCC}>
        <ModalNewDelivery uid={uid} resetData={resetState} />
      </Modal>

      <Modal animationType="slide" visible={modalVisibleUser}>
        <ModalUser fromUsers={true} resetState={resetState} />
      </Modal>

      <Pressable style={styles.btn} onPress={handleNewUser}>
        <FontAwesomeIcon style={styles.icon} icon={faPlus} size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: 5,
    borderTopColor: '#444',
    borderTopWidth: 1,
  },
  btn: [
    {
      height: 50,
      width: 50,
      alignSelf: 'center',
      position: 'absolute',
      borderRadius: 50,
      right: 20,
      bottom: 20,
    },
    globalStyles.green,
  ],
  input: {
    marginBottom: 10,
    marginHorizontal: 30,
  },
  txtBtn: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 30,
    fontWeight: '600',
  },
  icon: [
    {
      marginTop: 12,
    },
    globalStyles.icon,
  ],
});

export default Customers;
