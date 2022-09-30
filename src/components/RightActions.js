import {StyleSheet, Text, View, Pressable, Alert, Modal} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAppContext from '../hooks/useAppContext';
import ModalNewUser from './ModalNewUser';

const RightActions = ({uid, closeSwipeable}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {deleteVisitor, selectUser} = useAppContext();

  const handleDelete = async () => {
    closeSwipeable();
    Alert.alert('Delete this user?', 'A deleted user cannot be recovered', [
      {text: 'Cancel'},
      {text: 'Yes, delete', onPress: () => deleteVisitor(uid)},
    ]);
  };

  const handleEdit = () => {
    closeSwipeable();
    selectUser(uid);
    setModalVisible(true);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable style={[styles.btn, globalStyles.orange]} onPress={handleEdit}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#FFF'}]}
          icon={faPencil}
          size={10}
        />
        <Text style={styles.txtBtn}> Edit</Text>
      </Pressable>
      <Pressable style={[styles.btn, styles.btnDelete]} onPress={handleDelete}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#FFF'}]}
          icon={faTrashCan}
          size={10}
        />
        <Text style={styles.txtBtn}> Delete</Text>
      </Pressable>
      <Modal visible={modalVisible} animationType="slide">
        <ModalNewUser setModalVisible={setModalVisible} edit={true} />
      </Modal>
    </View>
  );
};

export default RightActions;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btn: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#4b6423',
    borderBottomWidth: 1,
  },
  btnDelete: {
    backgroundColor: '#EF4444',
  },
  txtBtn: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
});
