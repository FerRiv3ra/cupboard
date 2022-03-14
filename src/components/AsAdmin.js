import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, Alert } from 'react-native';
import globalStyles from '../styles/styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';


const AsAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {
        if([email, password].includes('')){
            Alert.alert('Error', 'Email and password are required');
        }

        const userLogin = {
            email: email.trim(),
            password
        }

        try {
            const response = await fetch('https://grubhubbackend.herokuapp.com/api/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(userLogin)
            });
            const user = await response.json();

            const { errors } = user; 

            if(errors !== undefined){
                Alert.alert('Error', errors[0]['msg']);
                return;
            }

            await AsyncStorage.setItem('token', user['token']);

            setEmail('');
            setPassword('');

            navigation.navigate('AdminMainScreen');
        } catch (error) {
            console.log('Error', error);
        }
    }
        
    return (
        <View style={globalStyles.view}>
            <Text style={globalStyles.label}>Email</Text>
            <TextInput 
                style={globalStyles.input}
                keyboardType='email-address'
                placeholder='Email'
                placeholderTextColor={'#666'}
                onChangeText={setEmail}
                value={email}
            /> 
            <Text style={globalStyles.label}>Password</Text>
            <TextInput 
                style={globalStyles.input}
                secureTextEntry={true}
                textContentType='password'
                placeholder='Password'
                placeholderTextColor={'#666'}
                onChangeText={setPassword}
                value={password}
            /> 
            <Pressable
                style={[globalStyles.button, globalStyles.orange]}
                onPress={handleLogin}
            >
                <FontAwesomeIcon 
                    style={[globalStyles.icon, {color: '#000'}]}
                    icon={faSignInAlt}
                />
                <Text style={globalStyles.textBtn}> Login</Text>
            </Pressable>
        </View>
  )
}

export default AsAdmin;