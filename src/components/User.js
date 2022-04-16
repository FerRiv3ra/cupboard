import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useRef } from 'react';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import RightActions from './RightActions';
import LeftAction from './LeftAction';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const User = ({
  item,
  setModalVisible,
  userEdit,
  userDelete,
  setModalVisibleUser,
  selectUser,
  goToCommunityCupboard,
  handleUnlock
}) => {
  const { name, email, dob, customer_id, role, uid, blocked } = item;

  const swipeableRef = useRef(null);

  const closeSwipeable = () => {
    swipeableRef.current.close();
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => {
        return (<RightActions
          setModalVisible={setModalVisible}
          userEdit={userEdit}
          userDelete={userDelete}
          uid={uid}
          role={role}
          closeSwipeable={closeSwipeable}
        />)
      }}
      renderLeftActions={() => {
        return (role === 'USER_ROLE' && <LeftAction
          uid={uid}
          goToCommunityCupboard={goToCommunityCupboard}
          closeSwipeable={closeSwipeable}
        />)
      }}
    >
      <View>
        <Pressable
          onLongPress={() => {
            if (role !== 'ADMIN_ROLE') {
              selectUser(uid, role);
              setModalVisibleUser(true);
            }
          }}
          style={styles.row}
        >
          <View style={styles.container}>
            {role === 'ADMIN_ROLE' ?
              <View>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.text}>{email}</Text>
              </View>
              :
              <View>
                <Text style={styles.text}>User ID: {customer_id}</Text>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.text}>{dob}</Text>
              </View>
            }
          </View>
          {blocked &&
            <Pressable 
              style={styles.blocked}
              onLongPress={() => handleUnlock(uid)}
            >
              <FontAwesomeIcon
                style={{ color: '#336210' }}
                size={20}
                icon={faLock}
              />
            </Pressable>}
        </Pressable>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    paddingVertical: 5,
    flexDirection: 'column',
    flex: 4
  },
  textName: {
    fontSize: 22,
    color: '#336210',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  text: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#4b6423',
    borderBottomWidth: 1,
  },
  blocked: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default User