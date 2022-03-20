import React, { useState, useEffect } from 'react';
import { Text, Image, SafeAreaView, StyleSheet, View } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AsAdmin from './AsAdmin';
import AsUser from './AsUser';
import { radioButtonsData, resetRadioData } from '../helpers/radioButtonsData';

const Login = () => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        return () =>{
            resetRadioData();
            handleRadio(radioButtonsData);
        }
    }, []);

    const handleRadio = (arrRbts) => {
        setRadioButtons(arrRbts);
        setIsAdmin(radioButtonsData[1].selected);
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
                    <Text style={styles.label}>Login as</Text>
                    <RadioGroup 
                        radioButtons={radioButtons} 
                        layout='row'
                        onPress={(arrRbts) => handleRadio(arrRbts, setRadioButtons, setIsAdmin, isAdmin)} 
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
        backgroundColor: '#B7DCCC',
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
    },
    label: {
        fontSize: 12
    }
})

export default Login;