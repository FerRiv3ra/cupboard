import { View, Text, FlatList, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import globalStyles from '../styles/styles';
import User from './User';
import ModalNewUser from './ModalNewUser';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

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
    const [admins, setAdmins] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('https://grubhubbackend.herokuapp.com/api/users?limit=0')
            response = await response.json()
            const adminsFilter = response.users.filter((adm) => adm.role === 'ADMIN_ROLE');
            setAdmins(adminsFilter);

            const customersFilter = response.users.filter((cus) => cus.role === 'USER_ROLE');
            setCustomers(customersFilter);
        }
    
        fetchMyAPI();
    }, [modalVisible])

    const handleNewUser = () => {
        setModalVisible(!modalVisible);
    }

    const handleChange = (arrRbt) => {
        setRadioButtons(arrRbt);
        setIsAdmin(!isAdmin);
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
            {isAdmin ? 
                admins.length === 0 && 
                <Text style={[globalStyles.label, {fontSize: 12}]}>There are admins to show</Text>
                :
                customers.length === 0 &&
                <Text style={[globalStyles.label, {fontSize: 12}]}>There are customers to show</Text>
            }
            {!isAdmin ? 
                <FlatList 
                    style={styles.list}
                    data={customers}
                    keyExtractor={(item) => item.uid}
                    renderItem={({item}) => {
                        return(
                            <User item={item}/>
                        )
                    }}
                /> :
                <FlatList 
                    style={styles.list}
                    data={admins}
                    keyExtractor={(item) => item.uid}
                    renderItem={({item}) => {
                        return(
                            <User item={item}/>
                        )
                    }}
                />
            }
            <ModalNewUser 
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        marginHorizontal: 30
    },
    btn: {
        marginTop: 20,
        marginBottom: 0,
        marginHorizontal: 30
    }
});

export default Customers