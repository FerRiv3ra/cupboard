import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, Alert, Modal, SafeAreaView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import globalStyles from '../styles/styles';
import ModalUser from './ModalUser';

const AsUser = () => {
    const userModel = {user: {
        child: false,
        customer_id: '',
        name: '',
        noPeople: 0,
        uid: ''
    }}
    const today = new Date();
    const [date, setDate] = useState(today);
    const [customerId, setCustomerId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [userLogged, setUserLogged] = useState(userModel);

    const handleDate = (selectedDate) => {
        let date = selectedDate;
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

        setDate(date);
    }

    const resetState = () => {
        setDate(today);
        setCustomerId('');
        setUserLogged(userModel);
    }

    const handleLogin = async () => {
        if([date, customerId].includes('')){
            Alert.alert('Error', 'Customer ID is required');
            return;
        }
    
        const [y, m, d] = date.toISOString().slice(0, 10).split('-');
    
        const userLogin = {
            customer_id: Number(customerId),
            dob: `${d}/${m}/${y}`
        }
    
        try {
            const response = await fetch('https://grubhubbackend.herokuapp.com/api/auth/login-user', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(userLogin)
            });
            const user = await response.json();
    
            if(user['msg'] !== undefined){
                Alert.alert('Error', user['msg']);
                return;
            }
    
            setUserLogged(user);

            setModalVisible(!modalVisible);
        } catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <View style={globalStyles.view}>
            <Text style={globalStyles.label}>Customer ID</Text>
            <TextInput 
                style={globalStyles.input}
                keyboardType='number-pad'
                placeholder='Customer ID'
                placeholderTextColor={'#666'}
                value={customerId}
                onChangeText={setCustomerId}
            /> 
            <Text style={globalStyles.label}>Date of birth</Text>
            <View style={globalStyles.dateContainer}>
                <DatePicker 
                    androidVariant='nativeAndroid'
                    date={date}
                    maximumDate={today}
                    mode='date'
                    onDateChange={(selectedDate) => handleDate(selectedDate)}
                /> 
            </View>
            <Pressable
                style={[globalStyles.button, globalStyles.orange]}
                onPress={() => handleLogin()}
            >
                <FontAwesomeIcon 
                    style={[globalStyles.icon, {color: '#000'}]}
                    icon={faSignInAlt}
                />
                <Text style={globalStyles.textBtn}> Login</Text>
            </Pressable>
            <Modal
                animationType='slide'
                visible={modalVisible}
            >
                <ModalUser 
                    userLogged={userLogged}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    resetState={resetState}
                />
            </Modal>
        </View>
    )
}

export default AsUser;