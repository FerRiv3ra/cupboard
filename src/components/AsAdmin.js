import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, Alert } from 'react-native';
import globalStyles from '../styles/styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash, faSignInAlt } from '@fortawesome/free-solid-svg-icons';


const AsAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    setIsLoading(true);
    if ([email, password].includes('')) {
      Alert.alert('Error', 'Email and password are required');
      setIsLoading(false);
      return;
    }

    const userLogin = {
      email: email.trim(),
      password
    }

    try {
      const response = await fetch('https://grubhubbackend.herokuapp.com/api/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userLogin)
      });
      const user = await response.json();

      const { msg } = user;

      if (msg !== undefined) {
        Alert.alert('Error', msg);
        setIsLoading(false);
        return;
      }
      await AsyncStorage.setItem('uid', user.user.uid);

      await AsyncStorage.setItem('token', user['token']);

      setEmail('');
      setPassword('');
      setIsLoading(false);
      navigation.navigate('AdminMainScreen');
    } catch (error) {
      Alert.alert('Error', 'Network request failed');
      setIsLoading(false);
    }
  }

  return (
    <View>
      <View style={[{ backgroundColor: '#EEE', paddingBottom: 20, borderBottomRightRadius: 50 }]}>
        <View style={globalStyles.view}>
          <Text style={globalStyles.label}>Email</Text>
          <TextInput
            style={[globalStyles.input, globalStyles.shadow]}
            keyboardType='email-address'
            placeholder='Email'
            placeholderTextColor={'#666'}
            onChangeText={setEmail}
            value={email}
          />
          <Text style={globalStyles.label}>Password</Text>
          <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[globalStyles.input, globalStyles.shadow, { flex: 1, marginRight: 10 }]}
            secureTextEntry={!passVisible}
            textContentType='password'
            placeholder='Password'
            placeholderTextColor={'#666'}
            onChangeText={setPassword}
            value={password}
          />
          <Pressable
            style={{ flexDirection: 'column', justifyContent: 'center' }}
            onPress={() => setPassVisible(!passVisible)}>
            <FontAwesomeIcon
              style={[globalStyles.icon, { color: '#444' }]}
              icon={passVisible ? faEyeSlash : faEye}
            />
          </Pressable>
          </View>
        </View>
      </View>
      <Pressable
        style={[globalStyles.button, { marginHorizontal: 30, marginTop: 20 }, isLoading ? globalStyles.gray : globalStyles.orange]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <FontAwesomeIcon
          style={[globalStyles.icon, { color: '#000' }]}
          icon={faSignInAlt}
        />
        <Text style={globalStyles.textBtn}> Login</Text>
      </Pressable>
    </View>
  )
}

export default AsAdmin;