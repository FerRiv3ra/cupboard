import React, {useState, useEffect, Fragment} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';

import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import globalStyles from '../styles/styles';
import ModalUser from './ModalUser';
import useAppContext from '../hooks/useAppContext';
import moment from 'moment';

const AsUser = () => {
  let today = new Date(`${moment().format('YYYY-MM-DD')}T00:00:00.000+00:00`);

  const [date, setDate] = useState(today);
  const [customerId, setCustomerId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {userLogin} = useAppContext();

  useEffect(() => {
    async function checkSession() {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user) {
        const [d, m, y] = user.dob.slice(0, 10).split('/');
        const dob = new Date(`${y}-${m}-${d}T00:00:00.000+00:00`);
        setCustomerId(user.customerId.toString());
        setDate(dob);
      }
    }

    checkSession();
  }, []);

  const handleDate = selectedDate => {
    let date = new Date(
      `${moment(selectedDate).format('YYYY-MM-DD')}T00:00:00.000+00:00`,
    );

    setDate(date);
  };

  const resetState = async () => {
    setDate(today);
    setCustomerId('');
    setModalVisible(false);
  };

  const handleLogin = async () => {
    setIsLoading(true);

    if (!customerId.length) {
      Alert.alert('Error', 'Visitor ID is required');
      setIsLoading(false);
      return;
    }

    const resp = await userLogin(customerId, date);

    if (!resp.ok) {
      Alert.alert('Error', resp.msg);
      setIsLoading(false);
      return;
    }

    await AsyncStorage.setItem(
      'user',
      JSON.stringify({customerId: resp.user.customerId, dob: resp.user.dob}),
    );

    setIsLoading(false);
    setModalVisible(true);
  };

  return (
    <View>
      <View
        style={[
          {
            backgroundColor: '#EEE',
            paddingBottom: 20,
            borderBottomRightRadius: 50,
          },
        ]}>
        <View style={globalStyles.view}>
          <Text style={globalStyles.label}>Visitor ID</Text>
          <TextInput
            style={[globalStyles.input, globalStyles.shadow]}
            keyboardType="number-pad"
            placeholder="Visitor ID"
            placeholderTextColor={'#666'}
            value={customerId}
            onChangeText={setCustomerId}
          />
          <Text style={globalStyles.label}>Date of birth</Text>
          <View style={[globalStyles.dateContainer, globalStyles.shadow]}>
            <DatePicker
              androidVariant="nativeAndroid"
              date={date}
              mode="date"
              theme="light"
              onDateChange={selectedDate => handleDate(selectedDate)}
            />
          </View>
        </View>
      </View>
      <Pressable
        style={[
          globalStyles.button,
          {marginHorizontal: 30, marginTop: 20},
          isLoading ? globalStyles.gray : globalStyles.green,
        ]}
        onPress={() => handleLogin()}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator animating={isLoading} />
        ) : (
          <Fragment>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#FFF'}]}
              icon={faSignInAlt}
            />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Login</Text>
          </Fragment>
        )}
      </Pressable>
      <Modal animationType="slide" visible={modalVisible}>
        <ModalUser resetState={resetState} />
      </Modal>
    </View>
  );
};

export default AsUser;
