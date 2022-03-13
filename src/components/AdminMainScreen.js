import React from 'react';
import { Text, ScrollView, SafeAreaView, Pressable, StyleSheet, Image } from 'react-native';
import globalStyles from '../styles/styles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut, faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const AdminMainScreen = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }

        navigation.navigate('Login');
    }

    const handleNavigate = (screen) => {
        navigation.navigate(screen);
    }

    return (
            <ScrollView style={[globalStyles.flex, globalStyles.lightGreen]}>
                <SafeAreaView style={styles.container}>
                    <Image 
                        style={styles.img}
                        source={require('../assets/logovc.png')}
                    />
                    <Pressable 
                        style={[globalStyles.button, globalStyles.orange]}
                        onPress={() => handleNavigate('Cupboard')}
                    >
                        <FontAwesomeIcon 
                            style={[globalStyles.icon]}
                            icon={faUtensils}
                        />
                        <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Community cupboard</Text>
                    </Pressable>
                    <Pressable 
                        style={[globalStyles.button, globalStyles.orange, styles.noMargin]}
                        onPress={() => handleNavigate('Customers')}
                    >
                        <FontAwesomeIcon 
                            style={globalStyles.icon}
                            icon={faUser}
                        />
                        <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Users</Text>
                    </Pressable>
                    <Pressable 
                        style={[globalStyles.button, globalStyles.green, styles.btn]}
                        onLongPress={handleLogout}
                    >
                        <FontAwesomeIcon 
                            style={globalStyles.icon}
                            icon={faSignOut}
                        />
                        <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Logout</Text>
                    </Pressable>
                </SafeAreaView>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    img: {
        alignSelf: 'center',
        marginTop: 30
    },
    container: {
        marginHorizontal: 30,
    },
    noMargin: {
        marginTop: 0
    }
})

export default AdminMainScreen;
