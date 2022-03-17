import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { SafeAreaView, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import globalStyles from '../styles/styles';

import * as Animatable from 'react-native-animatable';

const ModalUser = ({userLogged, setModalVisible, modalVisible, resetState, fromUsers}) => {
    const FromCus = fromUsers === undefined ? false : true;
    const { child, customer_id, name, noPeople, uid, phone } = (!FromCus ? userLogged['user'] : fromUsers.user);
    const logoFromFile = require('../assets/logovc.png');

    const logout = () => {
        if(FromCus){
            fromUsers.resetState();
        }else{
            resetState();
            setModalVisible(!modalVisible);
        }
    }

    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.lightGreen]}>
            <ScrollView>
                <Animatable.View 
                    style={styles.qrCode}
                    animation={'bounceIn'}
                    duration={2000}
                    delay={300}
                >
                    {uid !== '' && <QRCode
                        color='#4C5D23'
                        backgroundColor='#FFF'
                        value={uid}
                        logo={logoFromFile}
                        logoSize={60}
                        size={250}
                    />}
                </Animatable.View>
                <Animatable.View 
                    style={[globalStyles.shadow, styles.info]}
                    animation={'bounceIn'}
                    duration={2000}
                    delay={300}
                >
                    <Text style={styles.title}>Name: {''}
                        <Text style={styles.textInfo}>{name}</Text>
                    </Text>
                    <Text style={styles.title}>Customer ID: {''}
                        <Text style={styles.textInfo}>{customer_id}</Text>
                    </Text>
                    <Text style={styles.title}>Children: {''}
                        <Text style={styles.textInfo}>{child ? 'Yes' : 'No'}</Text>
                    </Text>
                    <Text style={styles.title}>People in household: {''}
                        <Text style={styles.textInfo}>{noPeople}</Text>
                    </Text>
                    <Text style={styles.title}>Phone: {''}
                        <Text style={styles.textInfo}>{phone ?? ''}</Text>
                    </Text>
                </Animatable.View>
                <Animatable.View
                    animation={'bounceInUp'}
                    duration={3000}
                    delay={700}
                >
                    <Pressable
                        style={[globalStyles.button, globalStyles.green, {marginHorizontal: 30}]}
                        onLongPress={logout}
                    >
                        <FontAwesomeIcon 
                            style={globalStyles.icon}
                            icon={faSignOut}
                        />
                        <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>{ FromCus ? ' Exit' : ' Logout'}</Text>
                    </Pressable>
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    qrCode: {
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFF',
        height: 280,
        width: 280,
        borderRadius: 20
    },
    info: {
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#FFF'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
        color: '#000'
    },
    textInfo: {
        textTransform: 'capitalize',
        fontWeight: '800',
        color: '#4C5D23'
    }
})

export default ModalUser;
