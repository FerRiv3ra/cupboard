import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import globalStyles from '../styles/styles';

import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faEyeSlash,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import useAppContext from '../hooks/useAppContext';

const AsAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);

  const {adminLogin} = useAppContext();
  const navigation = useNavigation();

  const handleLogin = async () => {
    setIsLoading(true);
    if ([email, password].includes('')) {
      Alert.alert('Error', 'Email and password are required');
      setIsLoading(false);
      return;
    }

    const resp = await adminLogin(email.trim(), password);

    if (!resp.ok) {
      Alert.alert('Error', resp.msg);
      setIsLoading(false);
      return;
    }

    setEmail('');
    setPassword('');
    setIsLoading(false);
    navigation.navigate('VerifyLogin');
  };

  return (
    <View>
      <View
        style={[
          {
            backgroundColor: '#EEE',
            borderBottomRightRadius: 50,
          },
        ]}>
        <View style={globalStyles.view}>
          <Text style={globalStyles.label}>Email</Text>
          <TextInput
            style={[globalStyles.input, globalStyles.shadow]}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor={'#666'}
            onChangeText={setEmail}
            value={email}
          />
          <Text style={globalStyles.label}>Password</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[globalStyles.input, globalStyles.shadow, styles.pass]}
              secureTextEntry={!passVisible}
              textContentType="password"
              placeholder="Password"
              placeholderTextColor={'#666'}
              onChangeText={setPassword}
              value={password}
            />
            <Pressable
              style={styles.btnViewPass}
              onPress={() => setPassVisible(!passVisible)}>
              <FontAwesomeIcon
                style={[globalStyles.icon, {color: '#444'}]}
                icon={passVisible ? faEyeSlash : faEye}
              />
            </Pressable>
          </View>
          <Pressable
            style={styles.forgot}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.textLinks}>Forgot password?</Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={[
          globalStyles.button,
          {marginHorizontal: 30, marginTop: 15},
          isLoading ? globalStyles.gray : globalStyles.green,
        ]}
        onPress={handleLogin}
        disabled={isLoading}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#FFF'}]}
          icon={faSignInAlt}
        />
        <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Login</Text>
      </Pressable>
      <Pressable
        style={styles.signUp}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.textLinks}>Don't have an account? Sign Up</Text>
      </Pressable>
      <Pressable
        style={styles.signUp}
        onPress={() => navigation.navigate('VerifyLogin')}>
        <Text style={styles.textLinks}>Have you already received a token?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnViewPass: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    right: 0,
  },
  forgot: {
    marginTop: 12,
    alignSelf: 'flex-end',
    padding: 5,
  },
  textLinks: {
    fontWeight: '500',
    color: '#333',
  },
  signUp: {
    alignSelf: 'center',
    marginTop: 12,
    padding: 5,
  },
  pass: {
    flex: 1,
  },
});

export default AsAdmin;
