import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../styles/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCancel, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import useAppContext from '../hooks/useAppContext';
import {useNavigation} from '@react-navigation/native';

const VerifyLogin = () => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {verifyTokenLogin} = useAppContext();
  const navigation = useNavigation();

  const handlePress = async () => {
    setIsLoading(true);
    if (!token) {
      Alert.alert('Error', 'Please paste or type your token.');
      setIsLoading(false);
      return;
    }

    const resp = await verifyTokenLogin(token);
    setIsLoading(false);

    if (!resp.ok) {
      Alert.alert('Error', resp.msg);
      return;
    }

    navigation.navigate('Cupboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <Image style={styles.image} source={require('../assets/logovc.png')} />
        <Text style={[styles.text, styles.title]}>Two-Step Verification</Text>
        <Text style={styles.text}>
          An email with the access token has been sent.
        </Text>
        <TextInput
          style={[globalStyles.input, globalStyles.shadow, styles.input]}
          keyboardType="default"
          placeholder="Paste the token"
          placeholderTextColor={'#666'}
          onChangeText={setToken}
          value={token}
        />
        <Pressable
          style={[
            globalStyles.button,
            styles.button,
            isLoading ? globalStyles.gray : globalStyles.green,
          ]}
          onPress={handlePress}
          disabled={isLoading}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#FFF'}]}
            icon={faSignInAlt}
          />
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
            {' '}
            Verify Token
          </Text>
        </Pressable>
        <Pressable
          style={[
            globalStyles.button,
            styles.buttonCancel,
            globalStyles.orange,
          ]}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#FFF'}]}
            icon={faCancel}
          />
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Cancel</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default VerifyLogin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  buttonCancel: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  image: {
    height: 220,
    width: 220,
    alignSelf: 'center',
    marginVertical: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    fontWeight: '700',
  },
  input: {
    marginHorizontal: 20,
    marginTop: 30,
  },
});
