import { Alert, View, Text, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import globalStyles from '../styles/styles';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { radioButtonsDataChild, radioButtonsDataNU, radioWithChild, resetDataChild, resetDataNU, resetDataWithChild } from '../helpers/radioButtonsData';

import FormUser from './FormUser';

const ModalNewUser = ({modalVisible, setModalVisible, user: userE}) => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsDataNU);
    const [radioChild, setRadioChild] = useState(radioButtonsDataChild);
    const [isAdmin, setIsAdmin] = useState(false);

    const today = new Date();
    const [date, setDate] = useState(today);

    const [uid, setUid] = useState('');
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
        if(userE['uid'] !== undefined){
            setUid(userE.uid)
            setName(userE.name)
            setNoPeople(userE.noPeople.toString())
            setDob(userE.dob)
            setAddress(userE.address)
            setPostcode(userE.postcode)
            setPhone(userE.phone)
            setEmail(userE.email)
            setRole(userE.role)

            if(userE.role === 'ADMIN_ROLE'){
                setIsAdmin(true);
            }

            const [d, m, y] = userE.dob.split('/');
            setDate(new Date(`${y}-${m}-${d}`));

            if(userE.child){
                handleRadioChild(radioWithChild);
            }else{
                handleRadioChild(radioButtonsDataChild);
            }
        }
    }, [userE]);
    

    const handleRadio = (arrRbts) => {
        setRadioButtons(arrRbts);
        
        if(!arrRbts[0].selected){
            setRole('ADMIN_ROLE')
            setPassword('')
            setConfirmPass('')
            setIsAdmin(true)
        }else{
            setRole('USER_ROLE')
            setPassword('abc123')
            setConfirmPass('abc123')
            setIsAdmin(false)
        }
    }

    const handleRadioChild = (arrRbtsC) => {
        setRadioChild(arrRbtsC);
        
        if(!arrRbtsC[0].selected){
            setChild(true)
        }else{
            setChild(false)
        }
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
        setAddress('');
        setPostcode('');
        setPhone('');
        setEmail('');
        setRole('');
        resetDataChild();
        handleRadioChild(radioButtonsDataChild);
        resetDataNU();
        handleRadio(radioButtonsDataNU);
        resetDataWithChild();
        setUid('');
    }

    const sendData = async () => {
        const user = {
            name,
            noPeople: Number(noPeople),
            dob,
            child,
            address,
            postcode: postcode.trim(),
            phone,
            email,
            role
        }

        if(password !== ''){
            user.password = password
        }

        const url = `https://grubhubbackend.herokuapp.com/api/users/${uid !== '' ? uid : ''}`;

        try {
            const response = await fetch(url, {
                method: uid === '' ? 'POST' : 'PUT',
                headers: {
                    "Content-Type": "application/json"
                    },
                body: JSON.stringify(user)
            });
            const userCreated = await response.json();

            if(userCreated['errors']){
                Alert.alert('Error', userCreated.errors[0].msg);
                return;
            }
            if(uid !== ''){
                if(userE.role === 'ADMIN_ROLE'){
                    Alert.alert('User edited', `User ${userE.name} modified`)
                }else{
                    Alert.alert('User edited', `User with customer ID ${userE.customer_id} modified`)
                }
            }else if(userCreated.uid){
                if(userCreated.role === 'ADMIN_ROLE'){
                    Alert.alert('User created', 'New admin created');
                }else{
                    Alert.alert('User created', `User ID ${userCreated.customer_id} assigned`);
                }
            }
            resetData();
            setModalVisible(!modalVisible);
        } catch (error) {
            console.log(error);
        }

    }

    const handleCreate = () => {
        if(isAdmin && email === ''){
            Alert.alert('Error', 'Email is required');
            return;
        }

        if(uid === '' && [name, password, confirmPass, dob, address, postcode].includes('')){
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
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                resetData();
                            }}
                        >
                            <Text
                                style={globalStyles.textBtn}
                            >X Cancel</Text>
                        </Pressable>
                        {uid === '' && <View style={{alignSelf: 'center'}} >
                            <Text style={[globalStyles.label, globalStyles.textCenter]}>User Type</Text>
                            <RadioGroup
                                radioButtons={radioButtons} 
                                layout='row'
                                onPress={(arrRbts) => handleRadio(arrRbts)} 
                            />
                        </View>}
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
                            uid={uid}
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