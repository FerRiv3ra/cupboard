import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react';
import globalStyles from '../styles/styles';
import User from './User';
import ModalNewUser from './ModalNewUser';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalUser from './ModalUser';

const radioButtonsData = [{
    id: '1', 
    label: 'CUSTOMERS',
    value: 'user',
    selected: true
}, {
    id: '2',
    label: 'ADMINS',
    value: 'admin',
    selected: false
}];

const Customers = () => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [user, setUser] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleUser, setModalVisibleUser] = useState(false);

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function fetchMyAPI() {
            let response = await fetch('https://grubhubbackend.herokuapp.com/api/users?limit=0')
            response = await response.json()
            const adminsFilter = response.users.filter((adm) => adm.role === 'ADMIN_ROLE');
            setAdmins(adminsFilter);

            const customersFilter = response.users.filter((cus) => cus.role === 'USER_ROLE');
            setIsLoading(false);
            setCustomers(customersFilter);
        }
    
        fetchMyAPI();
        setRefresh(false);
    }, [modalVisible, refresh])

    const handleNewUser = () => {
        setModalVisible(!modalVisible);
    }

    const handleChange = (arrRbt) => {
        setRadioButtons(arrRbt);
        setIsAdmin(!isAdmin);
    }

    const userEdit = (uid, role) => {
        let userToEdit = {};
        if(role === 'ADMIN_ROLE'){
            userToEdit = admins.filter((adm) => adm.uid === uid);
        }else{
            userToEdit = customers.filter((cus) => cus.uid === uid);
        }

        setUser(userToEdit[0]);
    }

    const selectUser = (uid, role) => {
        let userSelected = {};
        if(role === 'ADMIN_ROLE'){
            userSelected = admins.filter((adm) => adm.uid === uid);
        }else{
            userSelected = customers.filter((cus) => cus.uid === uid);
        }

        setUser(userSelected[0]);
    }

    const resetState = () => {
        setModalVisibleUser(false);
        setUser({});
    }

    const userDelete = (uid) => {
        const deleteU = async () => {
            const token = await AsyncStorage.getItem('token');

            const url = `https://grubhubbackend.herokuapp.com/api/users/${uid}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": token
                },
            });
            const result = await response.json();

            if(result.msg){
                Alert.alert('Error', `${result.msg} please login again`)
            }

            if(result.errors){
                Alert.alert('Error', result.errors[0].msg)
            }

            setRefresh(true);
        }

        Alert.alert('Are you sure you want to delete this user?', 'A deleted user cannot be recovered', [
            {text: 'Cancel'},
            {text: 'Yes, delete', onPress: () => deleteU()},
        ]);
    }

    return (
        <View style={[globalStyles.flex, globalStyles.lightGreen]}>
            <Pressable 
                style={[globalStyles.button, globalStyles.green, styles.btn]}
                onPress={handleNewUser}
            >
                <FontAwesomeIcon 
                    style={[globalStyles.icon, {color: '#FFF'}]}
                    icon={faCirclePlus}
                />
                <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> New User</Text>
            </Pressable>
            <View style={{alignSelf: 'center'}} >
                <Text style={[globalStyles.label, globalStyles.textCenter]}>View</Text>
                <RadioGroup
                    radioButtons={radioButtons} 
                    layout='row'
                    onPress={(arrRbt) => handleChange(arrRbt)} 
                />
            </View>
            <Text 
                    style={[globalStyles.label, globalStyles.textCenter]}
                >{isAdmin ? 'ADMINS' : 'CUSTOMERS'}</Text>
            {isLoading ? <ActivityIndicator 
                            animating={isLoading}
                            size="large"
                        /> :
            isAdmin ? 
                admins.length === 0 && 
                <Text style={[globalStyles.label, globalStyles.textCenter, {fontSize: 12}]}>There are admins to show</Text>
                :
                customers.length === 0 &&
                <Text style={[globalStyles.label, globalStyles.textCenter, {fontSize: 12}]}>There are customers to show</Text>
            }
            <FlatList 
                style={styles.list}
                data={isAdmin ? admins : customers}
                keyExtractor={(item) => item.uid}
                renderItem={({item}) => {
                    return(
                        <User 
                            item={item} 
                            setModalVisible={setModalVisible} 
                            userEdit={userEdit}
                            userDelete={userDelete}
                            setModalVisibleUser={setModalVisibleUser}
                            selectUser={selectUser}
                        />
                    )
                }}
            /> 
            <ModalNewUser 
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                user={user}
            />
            {modalVisibleUser && 
                <Modal
                    animationType='slide'
                    visible={modalVisibleUser}
                >
                    <ModalUser 
                        fromUsers={{
                            user,
                            resetState
                        }}
                    />
                </Modal>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        marginHorizontal: 30,
        marginBottom: 5
    },
    btn: {
        marginTop: 20,
        marginBottom: 0,
        marginHorizontal: 30
    }
});

export default Customers