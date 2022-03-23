import { StyleSheet, Text, View, Pressable, Alert, TextInput, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import globalStyles from '../styles/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ModalNewDelivery = ({uid, resetData}) => {
  const [user, setUser] = useState({});
  const [totalItems, setTotalItems] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  async function fetchData(){
    if(uid !== ''){
        const myRegExp = /^[a-f\d]{24}$/i;

        if(!uid.match(myRegExp)){
            Alert.alert('Error', 'No valid QR code', [
                {text: 'OK', onPress: () => resetData()},
            ]);
            return;
        }

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
        customer_id: user.customer_id,
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
        <SafeAreaView style={globalStyles.view}>
            <Pressable 
                style={[styles.button, globalStyles.orange]}
                onPress={() => resetData()}
            >
                <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>X Cancel</Text>
            </Pressable>
            <View style={[styles.info, globalStyles.shadow]}>
                <Text style={styles.title}><Text style={styles.label}>{user.name}</Text></Text>
                <Text style={styles.txt}>
                {user.noPeople === 1 ? 'Single' : 'Couple'} {' '} 
                {user.child_cant === 0 ? 'without children' : user.child_cant === 1 ? 'with 1 child' :
                `with ${user.child_cant} children`
                }
                </Text>
            <Text style={styles.txt}>{user.noPeople === 1 ? '15 items, 3 toiletries.' : '20 items, 6 toiletries'}</Text>
            <Text style={styles.txt}>Last visit: {user.last === '' ? 'First visit' : user.last}</Text>
            <Text style={styles.txt}>Total visits: {user.visits}</Text>
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
            <View style={{marginTop: 20}}>
                <Text style={styles.txt}>* Period products are available whenever they are needed, no restrictions.</Text>
                <Text style={styles.txt}>* Fruit and vegetables are given as extras as and when available.</Text>
            </View>
        </SafeAreaView>
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
