import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import globalStyles from '../styles/styles';
import {
  faAt,
  faCancel,
  faEye,
  faEyeSlash,
  faLock,
  faSignInAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import ShowAlert from '../components/ShowAlert';
import useAppContext from '../hooks/useAppContext';

const SignUp = () => {
  const regexStrong = new RegExp(
    '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$',
  );

  const regexEmail = new RegExp(
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$',
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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

  const {createAdminUser} = useAppContext();
  const navigation = useNavigation();

  const handlePress = async () => {
    setIsLoading(true);

    if ([name, email, password, confirmPass].includes('')) {
      Alert.alert('Error', 'All fields are required');
      setIsLoading(false);
      return;
    }

    if (!regexEmail.test(email)) {
      Alert.alert('Error', 'Invalid email');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@thevinecentre.org.uk')) {
      Alert.alert('Error', 'The email must belong to The Vine Centre domain');
      setIsLoading(false);
      return;
    }

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

    const user = {
      name,
      email,
      password,
    };

    const resp = await createAdminUser(user);
    setIsLoading(false);
    setPassword('');
    setConfirmPass('');

    if (!resp.ok) {
      Alert.alert('Error', resp.msg);
      return;
    }

    setName('');
    setEmail('');

    Alert.alert('Success', 'Account created successfully', [
      {text: 'Ok', onPress: () => navigation.goBack()},
    ]);
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAwareScrollView style={styles.container}>
        <Image style={styles.image} source={require('../assets/logovc.png')} />
        <Text style={styles.title}>Create new admin account</Text>
        <View style={styles.input}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
            icon={faUser}
            size={14}
          />
          <TextInput
            keyboardType="default"
            placeholder="Name"
            placeholderTextColor={'#666'}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.input}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
            icon={faAt}
            size={14}
          />
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor={'#666'}
            value={email}
            onChangeText={setEmail}
          />
        </View>
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
            icon={faSignInAlt}
          />
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
            {' '}
            Create Account
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

export default SignUp;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  button: {
    marginTop: 30,
  },
  buttonCancel: {
    marginTop: 10,
  },
  container: {
    marginHorizontal: 20,
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginVertical: 20,
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
  title: {
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#333',
  },
});
