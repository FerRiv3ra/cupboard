import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import React, {useRef} from 'react';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import RightActions from './RightActions';
import LeftAction from './LeftAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import useAppContext from '../hooks/useAppContext';

const User = ({
  item,
  setModalVisible,
  setModalVisibleUser,
  goToCommunityCupboard,
}) => {
  const {firstName, lastName, dob, customerId, uid, blocked} = item;

  const swipeableRef = useRef(null);

  const {unblockUser, selectUser} = useAppContext();

  const closeSwipeable = () => {
    swipeableRef.current.close();
  };

  const handleUnblock = async () => {
    Alert.alert('Unblock?', 'Are you sure you want to unblock this user?', [
      {text: 'Cancel'},
      {text: 'Yes, unblock', onPress: () => unblockUser(uid)},
    ]);
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => {
        return (
          <RightActions
            setModalVisible={setModalVisible}
            uid={uid}
            closeSwipeable={closeSwipeable}
          />
        );
      }}
      renderLeftActions={() => {
        return (
          <LeftAction
            uid={uid}
            goToCommunityCupboard={goToCommunityCupboard}
            closeSwipeable={closeSwipeable}
          />
        );
      }}>
      <View>
        <Pressable
          onLongPress={() => {
            selectUser(uid);
            setModalVisibleUser(true);
          }}
          style={styles.row}>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>User ID: {customerId}</Text>
              <Text style={styles.textName}>
                {firstName} {lastName}
              </Text>
              <Text style={styles.text}>{dob.slice(0, 10)}</Text>
            </View>
          </View>
          {blocked && (
            <Pressable style={styles.blocked} onLongPress={handleUnblock}>
              <FontAwesomeIcon
                style={{color: '#336210'}}
                size={20}
                icon={faLock}
              />
            </Pressable>
          )}
        </Pressable>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    paddingVertical: 5,
    flexDirection: 'column',
    flex: 4,
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
  },
});

export default User;
