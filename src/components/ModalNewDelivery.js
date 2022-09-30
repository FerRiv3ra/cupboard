import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';

import globalStyles from '../styles/styles';
import useAppContext from '../hooks/useAppContext';
import ModalDonation from './ModalDonation';

const ModalNewDelivery = ({uid, resetData}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const {getOneVisitor, verifyCanTake} = useAppContext();

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  async function fetchData() {
    if (uid !== '') {
      const myRegExp = /^[a-f\d]{24}$/i;

      if (!uid.match(myRegExp)) {
        Alert.alert('Error', 'No valid QR code', [
          {text: 'OK', onPress: () => resetData()},
        ]);
        return;
      }

      try {
        const resp = await getOneVisitor(uid);

        if (!resp.ok) {
          Alert.alert('Error', resp.msg, [
            {text: 'OK', onPress: () => resetData()},
          ]);
          return;
        }

        const {user} = resp;

        if (user.blocked) {
          Alert.alert(
            'Error',
            'This user needs to book a review, please contact the staff',
            [{text: 'OK', onPress: () => resetData()}],
          );
          return;
        }

        const canTake = await verifyCanTake(user.customerId);

        if (!canTake.ok) {
          Alert.alert('Error', canTake.msg, [
            {text: 'OK', onPress: () => resetData()},
          ]);
          return;
        }

        setIsLoading(false);
        setUser(user);
      } catch (error) {
        Alert.alert('Error', 'Network request failed');
        setIsLoading(false);
      }
    }
  }

  return (
    <View style={styles.background}>
      {isLoading ? (
        <ActivityIndicator animating={isLoading} size="large" />
      ) : (
        <SafeAreaView style={globalStyles.view}>
          <Pressable
            style={[styles.button, globalStyles.orange]}
            onPress={() => resetData()}>
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
              X Cancel
            </Text>
          </Pressable>
          <View style={[styles.info]}>
            <Text style={styles.title}>
              <Text style={styles.label}>
                {user.firstName} {user.lastName}
              </Text>
            </Text>
            <Text style={[styles.txt]}>
              {user.noHousehold - user.childCant === 1
                ? 'Single '
                : `${user.noHousehold} in household `}
              {user.childCant === 0
                ? '(0 children)'
                : user.childCant === 1
                ? '(1 child)'
                : `(${user.childCant} children)`}
            </Text>
            <Text style={styles.txt}>
              {user.noHousehold - user.childCant === 1 ? 15 : 20} items.
            </Text>
            <Text style={styles.txt}>
              <Text style={styles.label}>Last visit:</Text>{' '}
              {user.lastVisit === '' ? 'First visit' : user.lastVisit}
            </Text>
            <Text style={styles.txt}>
              <Text style={styles.label}>Total visits:</Text> {user.visits}
            </Text>
          </View>
          <Pressable
            style={[styles.button, globalStyles.green]}
            onPress={() => setModalVisible(true)}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#FFF'}]}
              icon={faSave}
            />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
              {' '}
              Save visit
            </Text>
          </Pressable>
          <View style={{marginTop: 20}}>
            <Text style={styles.txt}>
              * Period products are available whenever they are needed, no
              restrictions.
            </Text>
            <Text style={styles.txt}>
              * Fruit and vegetables are given as extras as and when available.
            </Text>
          </View>
        </SafeAreaView>
      )}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalDonation
          setModalVisible={setModalVisible}
          user={user}
          resetData={resetData}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  button: {
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  info: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  label: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  txt: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    borderBottomColor: '#AAA',
    borderBottomWidth: 1,
    fontSize: 18,
  },
});

export default ModalNewDelivery;
