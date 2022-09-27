import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import globalStyles from '../styles/styles';
import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSave,
  faUser,
  faUsers,
  faHome,
  faMapMarkerAlt,
  faCity,
  faHouseUser,
  faPhone,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import SegmentedControl from './SegmentedControls';
import moment from 'moment';
import useAppContext from '../hooks/useAppContext';

const FormUser = ({setModalVisible}) => {
  let today = new Date(`${moment().format('YYYY-MM-DD')}T00:00:00+00`);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [noHousehold, setNoHousehold] = useState('');
  const [child, setChild] = useState(false);
  const [childCant, setChildCant] = useState('');
  const [date, setDate] = useState(today);
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [town, setTown] = useState('');
  const [housingProvider, setHousingProvider] = useState('');
  const [phone, setPhone] = useState('');
  const [pensioner, setPensioner] = useState(false);
  const [policy, setPolicy] = useState(false);

  const {createUser} = useAppContext();

  const handleDate = selectedDate => {
    let date = new Date(
      `${moment(selectedDate).format('YYYY-MM-DD')}T00:00:00+00`,
    );

    setDate(date);
  };

  const handleCreate = async () => {
    if (
      [
        firstName,
        lastName,
        address,
        postcode,
        town,
        housingProvider,
        phone,
      ].includes('')
    ) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (Number(noHousehold) < 1) {
      Alert.alert('Error', 'Number in household no valid');
      return;
    }

    if (child && Number(childCant) <= 0) {
      Alert.alert('Error', 'Number of children is required');
      return;
    }

    if (!policy) {
      Alert.alert('Error', 'It is necessary to accept the terms');
      return;
    }

    const user = {
      firstName,
      lastName,
      noHousehold: Number(noHousehold),
      child,
      childCant: Number(childCant),
      dob: moment(date).format('DD/MM/YYYY'),
      address,
      postcode,
      town,
      housingProvider,
      phone,
      pensioner,
    };

    const resp = await createUser(user);

    if (!resp.ok) {
      Alert.alert('Error', resp.msg);
      return;
    }

    setFirstName('');
    setLastName('');
    setNoHousehold('');
    setChildCant('');
    setDate(today);
    setAddress('');
    setPostcode('');
    setTown('');
    setHousingProvider('');
    setPhone('');
    setPolicy(false);

    Alert.alert('Success', `User ID ${resp.user.customerId} assigned`, [
      {text: 'Ok', onPress: () => setModalVisible(false)},
    ]);
  };

  return (
    <View>
      <View style={[styles.input, {marginTop: 0}]}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
          icon={faUser}
          size={14}
        />
        <TextInput
          placeholder="First Name"
          keyboardType="default"
          placeholderTextColor={'#666'}
          onChangeText={setFirstName}
          value={firstName}
          autoCapitalize={'words'}
        />
      </View>
      <View style={styles.input}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
          icon={faUser}
          size={14}
        />
        <TextInput
          placeholder="Last Name"
          keyboardType="default"
          placeholderTextColor={'#666'}
          onChangeText={setLastName}
          value={lastName}
          autoCapitalize={'words'}
        />
      </View>
      <View style={styles.input}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
          icon={faUsers}
          size={14}
        />
        <TextInput
          placeholder="Number in household"
          keyboardType="numeric"
          placeholderTextColor={'#666'}
          onChangeText={setNoHousehold}
          value={noHousehold}
        />
      </View>

      <View>
        <Text style={styles.children}>Children in household</Text>
        <SegmentedControl
          values={[
            {key: 'No', value: false},
            {key: 'Yes', value: true},
          ]}
          onChange={setChild}
        />
      </View>
      {child && (
        <View style={[styles.input, {marginTop: 5}]}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
            icon={faUsers}
            size={14}
          />
          <TextInput
            placeholder="How many children?"
            keyboardType="numeric"
            placeholderTextColor={'#666'}
            onChangeText={setChildCant}
            value={childCant}
          />
        </View>
      )}

      <View style={globalStyles.dateContainer}>
        <Text style={styles.children}>Date of birth</Text>
        <DatePicker
          androidVariant="nativeAndroid"
          date={date}
          mode="date"
          onDateChange={selectedDate => handleDate(selectedDate)}
        />
      </View>

      <View style={[styles.input, {marginTop: 5}]}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
          icon={faHome}
          size={14}
        />
        <TextInput
          placeholder="Address"
          keyboardType="default"
          placeholderTextColor={'#666'}
          onChangeText={setAddress}
          value={address}
        />
      </View>
      <View style={styles.input}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
          icon={faMapMarkerAlt}
          size={14}
        />
        <TextInput
          placeholder="Postcode"
          keyboardType="default"
          placeholderTextColor={'#666'}
          onChangeText={setPostcode}
          value={postcode}
          autoCapitalize="characters"
        />
      </View>
      <View style={styles.input}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
          icon={faCity}
          size={14}
        />
        <TextInput
          placeholder="Town"
          keyboardType="default"
          placeholderTextColor={'#666'}
          onChangeText={setTown}
          value={town}
        />
      </View>
      <View style={styles.input}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
          icon={faHouseUser}
          size={14}
        />
        <TextInput
          placeholder="Housing provider"
          keyboardType="default"
          placeholderTextColor={'#666'}
          onChangeText={setHousingProvider}
          value={housingProvider}
        />
      </View>
      <View style={styles.input}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#666', marginRight: 10}]}
          icon={faPhone}
          size={14}
        />
        <TextInput
          placeholder="Phone"
          keyboardType="phone-pad"
          placeholderTextColor={'#666'}
          onChangeText={setPhone}
          value={phone}
        />
      </View>
      <View>
        <Text style={styles.children}>Pensioner</Text>
        <SegmentedControl
          values={[
            {key: 'No', value: false},
            {key: 'Yes', value: true},
          ]}
          onChange={setPensioner}
        />
      </View>

      <Pressable style={styles.policy} onPress={() => setPolicy(!policy)}>
        <View style={!policy && styles.icon}>
          {policy && (
            <FontAwesomeIcon
              style={globalStyles.icon}
              size={17}
              icon={faSquareCheck}
              color="#336210"
            />
          )}
        </View>

        <Text style={styles.policyText}>
          I agree to The Vine Centre storing my personal data
        </Text>
      </Pressable>

      <Pressable
        style={[globalStyles.button, globalStyles.green, {marginVertical: 20}]}
        onPress={handleCreate}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#FFF'}]}
          icon={faSave}
        />
        <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Create</Text>
      </Pressable>
    </View>
  );
};

export default FormUser;

const styles = StyleSheet.create({
  children: {
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
  policyText: {
    marginTop: 10,
    color: '#333',
    marginLeft: 5,
  },
  input: {
    marginTop: 20,
    flexDirection: 'row',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  policy: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    justifyContent: 'center',
    borderColor: '#333',
    borderWidth: 2,
    width: 17,
    height: 17,
  },
});
