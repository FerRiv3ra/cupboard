import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../styles/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAt,
  faClose,
  faEye,
  faEyeSlash,
  faLock,
  faSave,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import useAppContext from '../hooks/useAppContext';
import ShowAlert from './ShowAlert';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalAdminConfig = ({setModalVisible}) => {
  const regexStrong = new RegExp(
    '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$',
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [length8, setLength8] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [isPassOk, setIsPassOk] = useState(true);
  const [passVisible, setPassVisible] = useState(false);

  const handlePassword = pass => {
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
  };

  const {adminUser, updateAdmin, deleteAdmin} = useAppContext();
  const navigation = useNavigation();

  const handleSave = async () => {
    Keyboard.dismiss();
    const user = {};

    if (name) user.name = name;

    if (email) {
      if (!email.includes('@thevinecentre.org.uk')) {
        Alert.alert('Error', 'The email must belong to The Vine Centre domain');
        setIsLoading(false);
        return;
      }

      user.email = email;
    }

    if (password) {
      if (!isPassOk) {
        Alert.alert('Error', 'Invalid password');
        setIsLoading(false);
        return;
      }

      user.password = password;
    }

    if (!Object.entries(user).length) {
      Alert.alert('Information', 'Nothing to do!', [
        {text: 'Ok', onPress: () => setModalVisible(false)},
      ]);
      return;
    }

    const resp = await updateAdmin(user, adminUser.uid);

    if (!resp.ok) {
      Alert.alert('Error', resp.msg, [
        {text: 'Ok', onPress: () => setModalVisible(false)},
      ]);
      return;
    }

    setName('');
    setEmail('');
    setPassword('');

    Alert.alert('Success', 'Admin user updated', [
      {
        text: 'OK',
        onPress: () => {
          setModalVisible(false);
        },
      },
    ]);
  };

  const deleteAdminUser = async () => {
    const resp = await deleteAdmin(adminUser.uid);

    if (!resp.ok) {
      Alert.alert('Error', resp.msg);
      return;
    }

    Alert.alert('Success', 'Your account has been deleted', [
      {
        text: 'Ok',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          navigation.dispatch(StackActions.popToTop());
        },
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert('Warning', 'Are you sure you want to delete your account?', [
      {text: 'Cancel'},
      {text: 'Yes, delete', onPress: () => deleteAdminUser()},
    ]);
  };

  return (
    <View style={styles.centeredView}>
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.modalView}>
        <View style={styles.input}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
            icon={faUser}
            size={14}
          />
          <TextInput
            keyboardType="default"
            placeholder={adminUser.name}
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
            placeholder={adminUser.email}
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
            placeholder="**********"
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
        <Pressable
          onPress={handleSave}
          style={[globalStyles.button, globalStyles.green, styles.button]}>
          <FontAwesomeIcon style={globalStyles.icon} icon={faSave} />
          <Text style={[globalStyles.textBtn, styles.textButton]}> Save</Text>
        </Pressable>
        <Pressable
          onPress={handleDelete}
          style={[
            globalStyles.button,
            globalStyles.orange,
            styles.buttonDelete,
          ]}>
          <FontAwesomeIcon style={globalStyles.icon} icon={faTrash} />
          <Text style={[globalStyles.textBtn, styles.textButton]}>
            {' '}
            Delete my account
          </Text>
        </Pressable>
      </Pressable>
      <Pressable
        style={styles.buttonClose}
        onPress={() => setModalVisible(false)}>
        <FontAwesomeIcon
          style={globalStyles.icon}
          color="#333"
          icon={faClose}
        />
        <Text style={styles.txtBtnClose}> Cancel</Text>
      </Pressable>
    </View>
  );
};

export default ModalAdminConfig;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 30,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonDelete: {
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonClose: {
    flexDirection: 'row',
    marginTop: 30,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  txtBtnClose: {
    color: '#333',
    fontWeight: '600',
  },
  textButton: {
    color: '#FFF',
    fontSize: 14,
  },
  textStyle: {
    marginVertical: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
