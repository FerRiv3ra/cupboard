import { View, Text, Pressable, SafeAreaView, Image, StyleSheet } from 'react-native';
import React from 'react';
import globalStyles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import * as Animatable from 'react-native-animatable';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={[globalStyles.flex, {backgroundColor: '#FFF'}]}
        >
            <View style={styles.container}>
                <Animatable.View 
                    animation="pulse" 
                    easing="ease-out" 
                    iterationCount="infinite"    
                    style={styles.containerImg}
                >
                    <Image 
                        source={require('../assets/logovc.png')}
                    />
                </Animatable.View>
                <Animatable.View
                    animation={'bounceInDown'}
                    delay={1000}
                >
                    <Pressable
                        style={[globalStyles.button, globalStyles.green]}
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    >
                        <FontAwesomeIcon 
                            style={[globalStyles.icon, {color: '#FFF'}]}
                            icon={faSignInAlt}
                        />
                        <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Login</Text>
                    </Pressable>
                </Animatable.View>
                <Animatable.View
                    animation={'rubberBand'}
                    duration={3000}
                    iterationCount={2}
                >
                    <Text style={styles.title}>Community Cupboard</Text>
                    <Text style={styles.subtitle}>Opening hours</Text>
                    <Text style={styles.label}>Monday - Wendnesday</Text>
                    <Text style={styles.label}>10am - 3pm</Text>
                </Animatable.View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        justifyContent: 'space-between',
    },
    containerImg: {
        alignSelf: 'center',
        marginTop: 50
    },
    title: {
        color: '#3A6621',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '800'
    },
    subtitle: {
        color: '#3E3C02',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    }, 
    label: {
        color: '#796D00',
        textAlign: 'center',
        fontWeight: '500'
    }
})

export default WelcomeScreen;