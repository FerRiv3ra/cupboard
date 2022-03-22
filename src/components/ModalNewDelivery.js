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
  const [itemsPU, setItemsPU] = useState('');
  const [itemsChild, setItemsChild] = useState('');
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

    const extra = ((itemsPU === '' ? 0 : Number(itemsPU)) + (itemsChild === '' ? 0 : Number(itemsChild)));

    const token = await AsyncStorage.getItem('token');
    const data = {
        amount: Number(totalItems) + extra,
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
                Can take {15 + (Number(user.noPeople) - 1) * 3} items and
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
                placeholder='Total general items'
                keyboardType='number-pad'
                placeholderTextColor={'#666'}
                onChangeText={setTotalItems}
                value={totalItems}
                textAlign={'center'}
                maxLength={2}
            /> 
            <TextInput 
                style={[globalStyles.input, {marginTop: 10}]}
                placeholder='Total personal items'
                keyboardType='number-pad'
                placeholderTextColor={'#666'}
                onChangeText={setItemsPU}
                value={itemsPU}
                textAlign={'center'}
                maxLength={1}
            /> 
            { user.child &&
                <TextInput 
                    style={[globalStyles.input, {marginTop: 10}]}
                    placeholder='Total child items'
                    keyboardType='number-pad'
                    placeholderTextColor={'#666'}
                    onChangeText={setItemsChild}
                    value={itemsChild}
                    textAlign={'center'}
                    maxLength={1}
                />
            }
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
