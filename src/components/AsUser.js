import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Pressable, Alert, Modal, SafeAreaView } from 'react-native';
import DatePicker from 'react-native-date-picker';
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
            console.log(userLogged);
            setModalVisible(!modalVisible);
        } catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <View style={styles.view}>
            <Text style={styles.label}>Customer ID</Text>
            <TextInput 
                style={styles.input}
                keyboardType='number-pad'
                placeholder='Customer ID'
                placeholderTextColor={'#666'}
                value={customerId}
                onChangeText={setCustomerId}
            /> 
            <Text style={styles.label}>Date of birth</Text>
            <View style={styles.dateContainer}>
                <DatePicker 
                    date={date}
                    maximumDate={today}
                    mode='date'
                    onDateChange={(selectedDate) => handleDate(selectedDate)}
                /> 
            </View>
            <Pressable
                style={styles.button}
                onPress={() => handleLogin()}
            >
                <Text style={styles.textBtn}>Login</Text>
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

const styles = StyleSheet.create({
    dateContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
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
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10
    }
})

export default AsUser;