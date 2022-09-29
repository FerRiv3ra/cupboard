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
import {faSave} from '@fortawesome/free-solid-svg-icons';
import useAppContext from '../hooks/useAppContext';
import {useNavigation} from '@react-navigation/native';

const ModalDonation = ({setModalVisible, user, resetData}) => {
  const [amount, setAmount] = useState('');

  const {saveVisit} = useAppContext();
  const navigation = useNavigation();

  const handleSave = async () => {
    Keyboard.dismiss();
    const data = {
      amount: Number(amount) || 0,
      uid: user.uid,
      customerId: user.customerId,
    };

    const resp = await saveVisit(data);

    if (!resp.ok) {
      Alert.alert('Error', resp.msg);
      setModalVisible(false);
      return;
    }

    Alert.alert('Success', 'Visit saved', [
      {
        text: 'OK',
        onPress: () => {
          resetData();
          setModalVisible(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.centeredView}>
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.modalView}>
        <Text style={styles.textStyle}>Amount of donation given?</Text>
        <TextInput
          style={[globalStyles.input, globalStyles.shadow]}
          keyboardType="number-pad"
          placeholder="Amount"
          placeholderTextColor={'#666'}
          value={amount}
          onChangeText={setAmount}
        />
        <Pressable
          onPress={handleSave}
          style={[globalStyles.button, globalStyles.orange, styles.button]}>
          <FontAwesomeIcon style={globalStyles.icon} icon={faSave} />
          <Text style={[globalStyles.textBtn, styles.textButton]}>
            {' '}
            Save visit
          </Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default ModalDonation;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '70%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
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
    elevation: 2,
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
});
