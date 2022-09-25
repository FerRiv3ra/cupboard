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
import {faCancel, faMailBulk} from '@fortawesome/free-solid-svg-icons';
import useAppContext from '../hooks/useAppContext';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {forgotPasswordRequest} = useAppContext();
  const navigation = useNavigation();

  const handlePress = async () => {
    setIsLoading(true);
    if (!email) {
      Alert.alert('Error', 'Please type your email.');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@thevinecentre.org.uk')) {
      Alert.alert('Error', 'Invalid email');
      setIsLoading(false);
      return;
    }

    const resp = await forgotPasswordRequest(email);
    setIsLoading(false);

    if (!resp.ok) {
      Alert.alert('Error', resp.msg);
      return;
    }

    Alert.alert('Information', resp.msg, [
      {text: 'Ok', onPress: () => navigation.navigate('VerifyTokenForgot')},
    ]);
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAwareScrollView style={styles.container}>
        <Image style={styles.image} source={require('../assets/logovc.png')} />
        <Text style={[styles.text, styles.title]}>Forgot password?</Text>
        <Text style={styles.text}>
          We get it, stuff happens. Just enter your email address below and
          we'll send you a link to reset your password!
        </Text>
        <TextInput
          style={[globalStyles.input, globalStyles.shadow, styles.input]}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={'#666'}
          onChangeText={setEmail}
          value={email}
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
            icon={faMailBulk}
          />
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
            {' '}
            Send instructions
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

export default ForgotPassword;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  container: {
    marginHorizontal: 20,
  },
  button: {
    marginTop: 40,
  },
  buttonCancel: {
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
