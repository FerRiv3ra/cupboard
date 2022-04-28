import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import globalStyles from '../styles/styles';
import DatePicker from 'react-native-date-picker';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faVectorSquare,
  faEye,
  faEyeSlash,
  faSave,
  faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';

const FormUser = props => {
  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPass,
    setConfirmPass,
    date,
    today,
    handleDate,
    setPostcode,
    postcode,
    phone,
    setPhone,
    handleRadioChild,
    handleCreate,
    isAdmin,
    radioChild,
    uid,
    setNoHousehold,
    noHousehold,
    setChildCant,
    childCant,
    agree,
    setAgree,
    houseProvider,
    setHouseProvider,
  } = props;

  return (
    <KeyboardAwareScrollView>
      <Text style={globalStyles.label}>Name (required)</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Name"
        keyboardType="default"
        placeholderTextColor={'#666'}
        onChangeText={setName}
        value={name}
        autoCapitalize={'words'}
      />
      <Text style={globalStyles.label}>{`Email ${
        isAdmin ? '(required)' : '(optional)'
      }`}</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholderTextColor={'#666'}
        onChangeText={setEmail}
        value={email}
        autoCapitalize={'none'}
      />
      {isAdmin ? (
        <View>
          <Text style={globalStyles.label}>Password</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[globalStyles.input, {flex: 1, marginRight: 10}]}
              secureTextEntry={!passVisible}
              textContentType="password"
              placeholder="Password"
              placeholderTextColor={'#666'}
              onChangeText={setPassword}
              value={password}
              autoCapitalize={'none'}
            />
            <Pressable
              style={{flexDirection: 'column', justifyContent: 'center'}}
              onPress={() => setPassVisible(!passVisible)}>
              <FontAwesomeIcon
                style={[globalStyles.icon, {color: '#444'}]}
                icon={passVisible ? faEyeSlash : faEye}
              />
            </Pressable>
          </View>
          <Text style={globalStyles.label}>Confirm Password</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[globalStyles.input, {flex: 1, marginRight: 10}]}
              secureTextEntry={!confirmPassVisible}
              textContentType="password"
              placeholder="Confirm Password"
              placeholderTextColor={'#666'}
              onChangeText={setConfirmPass}
              value={confirmPass}
              autoCapitalize={'none'}
            />
            <Pressable
              style={{flexDirection: 'column', justifyContent: 'center'}}
              onPress={() => setConfirmPassVisible(!confirmPassVisible)}>
              <FontAwesomeIcon
                style={[globalStyles.icon, {color: '#444'}]}
                icon={confirmPassVisible ? faEyeSlash : faEye}
              />
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <Text style={[globalStyles.label]}>Number in household</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Number in household"
            keyboardType="number-pad"
            placeholderTextColor={'#666'}
            maxLength={2}
            onChangeText={setNoHousehold}
            value={noHousehold}
          />
          <View style={{alignItems: 'center'}}>
            <Text style={[globalStyles.label, globalStyles.textCenter]}>
              Children in household
            </Text>
            <RadioGroup
              radioButtons={radioChild}
              layout="row"
              onPress={arrRbtsC => handleRadioChild(arrRbtsC)}
            />
          </View>
          {radioChild[1].selected && (
            <View>
              <Text style={[globalStyles.label, globalStyles.textCenter]}>
                How many children?
              </Text>
              <TextInput
                style={globalStyles.input}
                placeholder="How many children?"
                keyboardType="number-pad"
                placeholderTextColor={'#666'}
                maxLength={1}
                textAlign={'center'}
                onChangeText={setChildCant}
                value={childCant}
              />
            </View>
          )}
        </View>
      )}
      <Text style={globalStyles.label}>Date of birth</Text>
      <View style={globalStyles.dateContainer}>
        <DatePicker
          androidVariant="nativeAndroid"
          date={date}
          maximumDate={today}
          mode="date"
          onDateChange={selectedDate => handleDate(selectedDate)}
        />
      </View>
      <Text style={globalStyles.label}>Postcode (required)</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Postcode"
        keyboardType="default"
        textContentType="postalCode"
        placeholderTextColor={'#666'}
        onChangeText={setPostcode}
        value={postcode}
      />
      {!isAdmin && (
        <View>
          <Text style={globalStyles.label}>Housing provider (required)</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Housing provider"
            keyboardType="default"
            placeholderTextColor={'#666'}
            onChangeText={setHouseProvider}
            value={houseProvider}
          />
        </View>
      )}
      <Text style={globalStyles.label}>Phone (required)</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Phone"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        placeholderTextColor={'#666'}
        onChangeText={setPhone}
        value={phone}
      />
      {!isAdmin && uid === '' && (
        <Pressable
          onPress={() => setAgree(!agree)}
          style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flexDirection: 'column', marginTop: 15}}>
            <FontAwesomeIcon
              style={[
                globalStyles.icon,
                {
                  color: agree ? '#3A6621' : '#444',
                  marginRight: 5,
                  marginTop: 5,
                },
              ]}
              size={26}
              icon={agree ? faCheckSquare : faVectorSquare}
            />
          </View>
          <Text style={[globalStyles.label, {fontSize: 15}]}>
            I agree to The Vine Centre storing my personal data
          </Text>
        </Pressable>
      )}
      <Pressable
        style={[globalStyles.button, globalStyles.green, {marginTop: 20}]}
        onPress={handleCreate}>
        {uid !== '' && (
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#FFF'}]}
            icon={faSave}
          />
        )}
        <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
          {uid === '' ? '+ Create' : ' Save'}
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default FormUser;
