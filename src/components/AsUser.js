import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Pressable, Alert, Modal } from 'react-native';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import globalStyles from '../styles/styles';
import ModalUser from './ModalUser';

const AsUser = () => {
  const userModel = {
    user: {
      child: false,
      customer_id: '',
      name: '',
      noPeople: 0,
      uid: ''
    }
  }
  const today = new Date();
  const [date, setDate] = useState(today);
  const [customerId, setCustomerId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userLogged, setUserLogged] = useState(userModel);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUserLogged(JSON.parse(user));
        setIsLoading(false);
        setModalVisible(!modalVisible);
      }
    }

    checkSession();
  }, []);

  const handleDate = (selectedDate) => {
    let date = selectedDate;
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

    setDate(date);
  }

  const resetState = async () => {
    setDate(today);
    setCustomerId('');
    setUserLogged(userModel);
  }

  const handleLogin = async () => {
    setIsLoading(true);

    if ([date, customerId].includes('')) {
      Alert.alert('Error', 'Customer ID is required');
      setIsLoading(false);
      return;
    }

    const [y, m, d] = date.toISOString().slice(0, 10).split('-');

    const user = await AsyncStorage.getItem('user');
    const userL = await JSON.parse(user);

    console.log(userL.user.customer_id)

    const userLogin = {
      customer_id: Number(customerId),
      dob: `${d}/${m}/${y}`
    }

    if (userL && userL.user.customer_id === userLogin.customer_id && userL.user.dob === userLogin.dob) {
      setUserLogged(userL);
      setIsLoading(false);
      setModalVisible(true);
    } else {
      try {
        const response = await fetch('https://grubhubbackend.herokuapp.com/api/auth/login-user', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userLogin)
        });
        const user = await response.json();

        if (user['msg'] !== undefined) {
          Alert.alert('Error', user['msg']);
          setIsLoading(false);
          return;
        }

        await AsyncStorage.setItem('user', JSON.stringify(user));

        setUserLogged(user);
        setIsLoading(false);
        setModalVisible(!modalVisible);
      } catch (error) {
        console.log('Error', error);
        Alert.alert('Error', 'Network request failed');
        setIsLoading(false);
      }
    }
  }

  return (
    <View>
      <View style={[{ backgroundColor: '#EEE', paddingBottom: 20, borderBottomRightRadius: 50 }]}>
        <View style={globalStyles.view}>
          <Text style={globalStyles.label}>Customer ID</Text>
          <TextInput
            style={[globalStyles.input, globalStyles.shadow]}
            keyboardType='number-pad'
            placeholder='Customer ID'
            placeholderTextColor={'#666'}
            value={customerId}
            onChangeText={setCustomerId}
          />
          <Text style={globalStyles.label}>Date of birth</Text>
          <View style={[globalStyles.dateContainer, globalStyles.shadow]}>
            <DatePicker
              androidVariant='nativeAndroid'
              date={date}
              maximumDate={today}
              mode='date'
              onDateChange={(selectedDate) => handleDate(selectedDate)}
            />
          </View>
        </View>
      </View>
      <Pressable
        style={[globalStyles.button, { marginHorizontal: 30, marginTop: 20 }, isLoading ? globalStyles.gray : globalStyles.orange]}
        onPress={() => handleLogin()}
        disabled={isLoading}
      >
        <FontAwesomeIcon
          style={[globalStyles.icon, { color: '#000' }]}
          icon={faSignInAlt}
        />
        <Text style={globalStyles.textBtn}> Login</Text>
      </Pressable>
      <Modal
        animationType='slide'
        visible={modalVisible}
      >
        <ModalUser
          userLogged={userLogged}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          resetState={resetState}
        />
      </Modal>
    </View>
  )
}

export default AsUser;