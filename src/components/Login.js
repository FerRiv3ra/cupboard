import React, { useEffect, useState } from 'react';
import { Text, Image, SafeAreaView, StyleSheet, View, Pressable } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AsAdmin from './AsAdmin';
import AsUser from './AsUser';

const radioButtonsData = [{
    id: '1', 
    label: 'CUSTOMER',
    value: 'user',
    selected: true
}, {
    id: '2',
    label: 'ADMIN',
    value: 'admin',
    selected: false
}]

const Login = () => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleRadio = (arrRbts) => {
        setRadioButtons(arrRbts);
        setIsAdmin(!isAdmin);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>          
                <View style={styles.containerLogo}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/ccvc.png')}
                    />
                </View>
                <View style={styles.view}>
                    <Text>Login as</Text>
                    <RadioGroup 
                        radioButtons={radioButtons} 
                        layout='row'
                        onPress={(arrRbts) => handleRadio(arrRbts)} 
                    />
                </View>
                {
                !isAdmin 
                    ? <AsUser /> 
                    : <AsAdmin />}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B0CA91',
        justifyContent: 'center',
        flex: 1
    },
    containerLogo: {
        alignSelf: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    view: {
        alignItems: 'center'
    }
})

export default Login;