import { StyleSheet, Text, View, Pressable, Alert, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import globalStyles from '../styles/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ModalNewDelivery = ({uid, resetData}) => {
  const [user, setUser] = useState({});
  const [totalItems, setTotalItems] = useState('0');
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  async function fetchData(){
    if(uid !== ''){
        let response = await fetch(`https://grubhubbackend.herokuapp.com/api/users/${uid}`);
            response = await response.json()
        
        if(response['errors']){
            Alert.alert('Error', response['errors'][0].msg, [
                {text: 'OK', onPress: () => resetData()},
            ]);
            return;
        }

        if(response){
            let canTake = await fetch(`https://grubhubbackend.herokuapp.com/api/deliveries/${response.customer_id}`);
            canTake = await canTake.json();

            if(canTake['error']){
                Alert.alert('Error', canTake.error, [
                    {text: 'OK', onPress: () => resetData()},
                ]);
                return;
            }

            setIsLoading(false);
            setUser(response);
        }

    }
  }

  const handleSubmit = async () => {
    if(totalItems === '' || totalItems === '0'){
        Alert.alert('Error', 'Total items is required');
    }

    const token = await AsyncStorage.getItem('token');
    const data = {
        amount: Number(totalItems),
        customer_id: user.customer_id
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
        
        if(delivery['_id']){
            Alert.alert('Success', 'New give away saved', [
                {text: 'OK', onPress: () => {
                    resetData();
                    navigation.navigate('Cupboard');
                }}
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
        <View style={globalStyles.view}>
            <Pressable 
                style={[styles.button, globalStyles.orange]}
                onPress={() => resetData()}
            >
                <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>X Cancel</Text>
            </Pressable>
            <View style={[styles.info, globalStyles.shadow]}>
                <Text style={styles.title}>Customer ID: <Text style={styles.label}>{user.customer_id}</Text></Text>
                <Text style={styles.txt}>
                <Text style={styles.label}>{user.name} </Text>
                can take {15 + (Number(user.noPeople) - 1) * 3} items and
                3 additional for personal use
                </Text>
                <Text style={styles.txt}>This household {!user.child && 'don\'t'} have childs{user.child ? ' in that case, can take 3 additional items for childs' : '.'}
                </Text>
                <Text style={styles.txt}>Total items household can carry 
                <Text style={styles.label}> {user.child ? (21 + (Number(user.noPeople) - 1) * 3) : (18 + (Number(user.noPeople) - 1) * 3)}</Text>
                </Text>
            </View>
            <TextInput 
                style={globalStyles.input}
                placeholder='Total items'
                keyboardType='number-pad'
                placeholderTextColor={'#666'}
                onChangeText={setTotalItems}
                value={totalItems}
            /> 
            <Pressable 
                style={[styles.button, globalStyles.green]}
                onPress={() => handleSubmit()}
            >
                <FontAwesomeIcon 
                    style={[globalStyles.icon, {color: '#FFF'}]}
                    icon={faSave}
                />
                <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Save</Text>
            </Pressable>
        </View>
      }
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    button:{
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
        fontWeight: '400'
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
