import { Alert, View, Text, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import globalStyles from '../styles/styles';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { radioButtonsDataChild, radioButtonsDataNU } from '../helpers/radioButtonsData';

import FormUser from './FormUser';

const ModalNewUser = ({modalVisible, setModalVisible}) => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsDataNU);
    const [radioChild, setRadioChild] = useState(radioButtonsDataChild);
    const [isAdmin, setIsAdmin] = useState(false);

    const today = new Date();
    const [date, setDate] = useState(today);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('abc123');
    const [confirmPass, setConfirmPass] = useState('abc123');
    const [noPeople, setNoPeople] = useState('1');
    const [dob, setDob] = useState('');
    const [child, setChild] = useState(false);
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER_ROLE');

    useEffect(() => {
        resetData();
        if(isAdmin){
            setRole('ADMIN_ROLE')
            setPassword('')
            setConfirmPass('')
        }else{
            setRole('USER_ROLE')
            setPassword('abc123')
            setConfirmPass('abc123')
        }
    }, [isAdmin])
    

    const handleRadio = (arrRbts) => {
        setRadioButtons(arrRbts);
        setIsAdmin(!isAdmin);
    }

    const handleRadioChild = (arrRbts) => {
        setRadioButtons(arrRbts);
        setChild(!child);
    }

    const handleDate = (selectedDate) => {
        let date = selectedDate;
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

        setDate(date);

        const [y, m, d] = date.toISOString().slice(0, 10).split('-');
    
        setDob(`${d}/${m}/${y}`);
    }    

    const resetData = () => {
        setDate(today);
        setName(''),
        setPassword('');
        setConfirmPass('');
        setNoPeople('1');
        setDob('');
        setChild(false);
        setAddress('');
        setPostcode('');
        setPhone('');
        setEmail('');
        setRole('');
        setRadioChild(radioButtonsDataChild);
    }

    const sendData = async () => {
        const user = {
            name,
            password,
            noPeople: Number(noPeople),
            dob,
            child,
            address,
            postcode: postcode.trim(),
            phone,
            email,
            role
        }

        try {
            const response = await fetch('https://grubhubbackend.herokuapp.com/api/users/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify(user)
            });
            const userCreated = await response.json();

            if(userCreated['errors']){
                Alert.alert('Error', userCreated.errors[0].msg)
            }
            if(userCreated.uid){
                Alert.alert('ALert', 'User Created');
                setModalVisible(!modalVisible);
            }
        } catch (error) {
            console.log(error);
        }

        resetData();
    }

    const handleCreate = () => {
        if(isAdmin && email === ''){
            Alert.alert('Error', 'Email is required');
            return;
        }

        if([name, password, confirmPass, dob, address, postcode].includes('')){
            Alert.alert('Error', 'Required fields are empty');
            return;
        }

        if(password !== confirmPass){
            Alert.alert('Error', 'The passwords are diferent');
            return;
        }

        sendData();
    }

    return (
        <SafeAreaView>
            <Modal
                visible={modalVisible}
            >
                <ScrollView 
                    style={[globalStyles.flex, globalStyles.lightGreen]}
                >
                    <View style={styles.container}>
                        <Pressable 
                            style={[globalStyles.button, globalStyles.orange, {marginBottom: 10}]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text
                                style={globalStyles.textBtn}
                            >X Cancel</Text>
                        </Pressable>
                        <View style={{alignSelf: 'center'}} >
                            <Text style={[globalStyles.label, globalStyles.textCenter]}>User Type</Text>
                            <RadioGroup
                                radioButtons={radioButtons} 
                                layout='row'
                                onPress={(arrRbts) => handleRadio(arrRbts)} 
                            />
                        </View>
                        <FormUser 
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPass={confirmPass}
                            setConfirmPass={setConfirmPass}
                            date={date}
                            today={today}
                            handleDate={handleDate}
                            setAddress={setAddress}
                            address={address}
                            setPostcode={setPostcode}
                            postcode={postcode}
                            phone={phone}
                            setPhone={setPhone}
                            setNoPeople={setNoPeople}
                            noPeople={noPeople}
                            handleRadioChild={handleRadioChild}
                            handleCreate={handleCreate}
                            isAdmin={isAdmin}
                            radioChild={radioChild}
                            child={child}
                            setChild={setChild}
                            setRadioChild={setRadioChild}
                        />
                    </View>
                </ScrollView>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginHorizontal: 30
    }
});

export default ModalNewUser