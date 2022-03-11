import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, Alert } from 'react-native';

const AsAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if([email, password].includes('')){
            Alert.alert('Error', 'Email and password are required');
        }

        const userLogin = {
            email,
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

            if(user['msg'] !== undefined){
                Alert.alert('Error', user['msg']);
            }

            console.log(user);
        } catch (error) {
            console.log('Error', error);
        }
    }
        
    return (
        <View style={styles.view}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.input}
                keyboardType='email-address'
                placeholder='Email'
                placeholderTextColor={'#666'}
                onChangeText={setEmail}
            /> 
            <Text style={styles.label}>Password</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                textContentType='password'
                placeholder='Password'
                placeholderTextColor={'#666'}
                onChangeText={setPassword}
            /> 
            <Pressable
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.textBtn}>Login</Text>
            </Pressable>
        </View>
  )
}

const styles = StyleSheet.create({
    view: {
        marginHorizontal: 30,
        marginBottom: 15
    },
    label: {
        color: '#000',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    button:{
        marginVertical: 40,
        backgroundColor: '#E6653E',
        paddingVertical: 20,
        borderRadius: 10
    },
    textBtn:{
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 16
    }
})

export default AsAdmin;