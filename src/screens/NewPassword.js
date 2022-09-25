import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import globalStyles from '../styles/styles';
import {
  faEye,
  faEyeSlash,
  faKey,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import ShowAlert from '../components/ShowAlert';
import {StackActions, useNavigation} from '@react-navigation/native';
import useAppContext from '../hooks/useAppContext';

const NewPassword = props => {
  const {token} = props.route.params;
  const regexStrong = new RegExp(
    '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$',
  );

  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [length8, setLength8] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [isPassOk, setIsPassOk] = useState(true);
  const [passMatch, setPassMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const {updatePassword} = useAppContext();
  const navigation = useNavigation();

  const handlePassword = (pass, confirm = false) => {
    if (confirm) {
      setConfirmPass(pass);
      setPassMatch(password === pass);
    } else {
      const hasMayus = new RegExp('^(?=.*[A-Z])');
      const hasMinus = new RegExp('^(?=.*[a-z])');
      const hasNum = new RegExp('^(?=.*[0-9])');
      const hasSpe = new RegExp('^(?=.*[!@#$&*])');

      setPassword(pass);

      setLength8(pass.length >= 8);
      setHasUpper(hasMayus.test(pass));
      setHasLower(hasMinus.test(pass));
      setHasNumber(hasNum.test(pass));
      setHasSpecial(hasSpe.test(pass));
      setIsPassOk(regexStrong.test(pass));
    }
  };

  const handlePress = async () => {
    if (!isPassOk) {
      Alert.alert('Error', 'Invalid password');
      setIsLoading(false);
      return;
    }

    if (!passMatch) {
      Alert.alert('Error', `Password don't match`);
      setIsLoading(false);
      return;
    }

    const resp = await updatePassword(password, token);

    if (!resp.ok) {
      Alert.alert('Error', resp.msg);
      return;
    }

    Alert.alert('Success', 'Password updated', [
      {text: 'Ok', onPress: () => navigation.dispatch(StackActions.pop(3))},
    ]);
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAwareScrollView style={styles.container}>
        <Image style={styles.image} source={require('../assets/logovc.png')} />
        <Text style={[styles.text, styles.title]}>New password</Text>
        <View style={styles.input}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
            icon={faLock}
            size={14}
          />
          <TextInput
            keyboardType="default"
            placeholder="Password"
            placeholderTextColor={'#666'}
            secureTextEntry={!passVisible}
            value={password}
            onChangeText={pass => handlePassword(pass)}
          />
          <Pressable
            style={styles.handlePass}
            onPress={() => setPassVisible(!passVisible)}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#333'}]}
              icon={passVisible ? faEyeSlash : faEye}
              size={14}
            />
          </Pressable>
        </View>
        {!isPassOk && (
          <View>
            <ShowAlert
              title="The password must have at least 8 characters."
              type={length8 ? 'success' : 'error'}
            />
            <ShowAlert
              title="The password must have at least one capital letter."
              type={hasUpper ? 'success' : 'warning'}
            />
            <ShowAlert
              title="The password must have at least one lowercase."
              type={hasLower ? 'success' : 'warning'}
            />
            <ShowAlert
              title="The password must have at least one number."
              type={hasNumber ? 'success' : 'warning'}
            />
            <ShowAlert
              title="Password must have at least one special character."
              type={hasSpecial ? 'success' : 'warning'}
            />
          </View>
        )}
        <View style={styles.input}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
            icon={faLock}
            size={14}
          />
          <TextInput
            keyboardType="default"
            placeholder="Confirm password"
            placeholderTextColor={'#666'}
            secureTextEntry={!confirmVisible}
            value={confirmPass}
            onChangeText={pass => handlePassword(pass, true)}
          />
          <Pressable
            style={styles.handlePass}
            onPress={() => setConfirmVisible(!confirmVisible)}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#333'}]}
              icon={confirmVisible ? faEyeSlash : faEye}
              size={14}
            />
          </Pressable>
        </View>
        {confirmPass && !passMatch && (
          <ShowAlert title="Passwords don't match." type="error" />
        )}
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
            icon={faKey}
          />
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
            {' '}
            Change password
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default NewPassword;

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
    marginTop: 20,
    flexDirection: 'row',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  handlePass: {
    position: 'absolute',
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
});
