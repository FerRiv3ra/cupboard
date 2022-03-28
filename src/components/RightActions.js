import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../styles/styles';

const RightActions = ({ setModalVisible, userEdit, userDelete, uid, role, closeSwipeable }) => {
  return (
    <View
      style={{ flexDirection: 'row' }}
    >
      <Pressable
        style={[styles.btn, globalStyles.orange]}
        onPress={() => {
          closeSwipeable()
          setModalVisible(true)
          userEdit(uid, role)
        }}
      >
        <FontAwesomeIcon
          style={[globalStyles.icon, { color: '#FFF' }]}
          icon={faPencil}
          size={10}
        />
        <Text style={styles.txtBtn}> Edit</Text>
      </Pressable>
      <Pressable
        style={[styles.btn, styles.btnDelete]}
        onPress={() => {
          closeSwipeable()
          userDelete(uid)
        }}
      >
        <FontAwesomeIcon
          style={[globalStyles.icon, { color: '#FFF' }]}
          icon={faTrashCan}
          size={10}
        />
        <Text style={styles.txtBtn}> Delete</Text>
      </Pressable>
    </View>
  )
}

export default RightActions

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  btn: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDelete: {
    backgroundColor: '#EF4444'
  },
  txtBtn: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF'
  }
})