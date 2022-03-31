import { StyleSheet, Text, View, Pressable, Alert, TextInput, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import globalStyles from '../styles/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ModalNewDelivery = ({ uid, resetData }) => {
  const [user, setUser] = useState({});
  const [totalItems, setTotalItems] = useState('');
  const [toiletries, setToiletries] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  async function fetchData() {
    if (uid !== '') {
      const myRegExp = /^[a-f\d]{24}$/i;

      if (!uid.match(myRegExp)) {
        Alert.alert('Error', 'No valid QR code', [
          { text: 'OK', onPress: () => resetData() },
        ]);
        return;
      }

      try {
        let response = await fetch(`https://grubhubbackend.herokuapp.com/api/users/${uid}`);
        response = await response.json()

        if(response['errors']) {
          Alert.alert('Error', response['errors'][0].msg, [
            { text: 'OK', onPress: () => resetData() },
          ]);
          return;
        }

        if(response.blocked){
          Alert.alert('Error', 'This user needs to book a review, please contact the staff', [
            { text: 'OK', onPress: () => resetData() },
          ]);
          return;
        }

        if(response) {
          let canTake = await fetch(`https://grubhubbackend.herokuapp.com/api/deliveries/${response.customer_id}`);
          canTake = await canTake.json();

          if (canTake['error']) {
            Alert.alert('Error', canTake.error, [
              { text: 'OK', onPress: () => resetData() },
            ]);
            return;
          }

          setIsLoading(false);
          setUser(response);
        }
      } catch (error) {
        Alert.alert('Error', 'Network request failed');
        setIsLoading(false);
      }

    }
  }

  const handleSubmit = async () => {
    if (totalItems === '' || totalItems === '0') {
      Alert.alert('Error', 'Total items is required');
      return;
    }

    if (user.no_household - user.child_cant === 1 && totalItems > 15) {
      Alert.alert('Error', 'You cannot exceed the total allowable number of items');
      return;
    }

    if (user.no_household - user.child_cant > 1 && totalItems > 20) {
      Alert.alert('Error', 'You cannot exceed the total allowable number of items');
      return;
    }

    if (Number(toiletries) > user.toiletries) {
      Alert.alert('Error', 'You cannot exceed the total allowable number of toiletries');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const data = {
      amount: toiletries === '' ? Number(totalItems) : Number(toiletries) + Number(totalItems),
      customer_id: user.customer_id,
      cant_toiletries: toiletries === '' ? 0 : Number(toiletries),
      uid
    }

    try {
      const response = await fetch('https://grubhubbackend.herokuapp.com/api/deliveries', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-token": token
        },
        body: JSON.stringify(data)
      });
      const delivery = await response.json();

      if (delivery['_id']) {
        Alert.alert('Success', 'New give away saved', [
          {
            text: 'OK', onPress: () => {
              resetData();
              navigation.navigate('Cupboard');
            }
          }
        ]);
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <KeyboardAwareScrollView style={[globalStyles.lightGreen, globalStyles.flex]}>
      {isLoading ?
        <ActivityIndicator
          animating={isLoading}
          size="large"
        />
        :
        <SafeAreaView style={globalStyles.view}>
          <Pressable
            style={[styles.button, globalStyles.orange]}
            onPress={() => resetData()}
          >
            <Text style={[globalStyles.textBtn, { color: '#FFF' }]}>X Cancel</Text>
          </Pressable>
          <View style={[styles.info, globalStyles.shadow]}>
            <Text style={styles.title}><Text style={styles.label}>{user.name}</Text></Text>
            <Text style={[styles.txt]}>
              {user.no_household - user.child_cant === 1 ? 'Single ' : `${user.no_household} in household `}
              {user.child_cant === 0 ? '(0 children)' : user.child_cant === 1 ? '(1 child)' :
                `(${user.child_cant} children)`
              }
            </Text>
            <Text style={styles.txt}>{user.no_household - user.child_cant === 1 ? 15 : 20} {`items, ${user.toiletries} toiletries.`}</Text>
            <Text style={styles.txt}><Text style={styles.label}>Last visit:</Text> {user.last === '' ? 'First visit' : user.last}</Text>
            <Text style={styles.txt}><Text style={styles.label}>Total visits:</Text> {user.visits}</Text>
          </View>
          <TextInput
            style={globalStyles.input}
            placeholder='Total items'
            keyboardType='number-pad'
            placeholderTextColor={'#666'}
            onChangeText={setTotalItems}
            value={totalItems}
            textAlign={'center'}
            maxLength={2}
          />
          {user.toiletries !== 0 && <TextInput
            style={[globalStyles.input, { marginTop: 10 }]}
            placeholder='Toiletries'
            keyboardType='number-pad'
            placeholderTextColor={'#666'}
            onChangeText={setToiletries}
            value={toiletries}
            textAlign={'center'}
            maxLength={1}
          />}
          <Pressable
            style={[styles.button, globalStyles.green]}
            onPress={() => handleSubmit()}
          >
            <FontAwesomeIcon
              style={[globalStyles.icon, { color: '#FFF' }]}
              icon={faSave}
            />
            <Text style={[globalStyles.textBtn, { color: '#FFF' }]}> Save</Text>
          </Pressable>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.txt}>* Period products are available whenever they are needed, no restrictions.</Text>
            <Text style={styles.txt}>* Fruit and vegetables are given as extras as and when available.</Text>
          </View>
        </SafeAreaView>
      }
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  info: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFF'
  },
  label: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  txt: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    borderBottomColor: '#AAA',
    borderBottomWidth: 1,
    fontSize: 18
  }
})

export default ModalNewDelivery
