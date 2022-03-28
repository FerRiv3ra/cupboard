import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useRef } from 'react';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import RightActions from './RightActions';
import LeftAction from './LeftAction';

const User = ({
  item,
  setModalVisible,
  userEdit,
  userDelete,
  setModalVisibleUser,
  selectUser,
  goToCommunityCupboard
}) => {
  const { name, email, dob, customer_id, role, uid } = item;

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
        return (<LeftAction
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
        >
          <View style={styles.container}>
            {role === 'ADMIN_ROLE' ?
              <View>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.text}>{email}</Text>
              </View>
              :
              <View>
                <Text style={styles.text}>Customer ID: {customer_id}</Text>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.text}>{dob}</Text>
              </View>
            }
          </View>
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
    borderBottomColor: '#4b6423',
    borderBottomWidth: 1
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
});

export default User