import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import globalStyles from '../styles/styles';

const ModalUser = ({userLogged, setModalVisible, modalVisible, resetState}) => {
    const { child, customer_id, name, noPeople, uid } = (userLogged['user']);
    const logoFromFile = require('../assets/logovc.png');

    const logout = () => {
        resetState();
        setModalVisible(!modalVisible);
    }

    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.orange]}>
            <ScrollView>
                <View style={styles.qrCode}>
                    {uid !== '' && <QRCode
                        color='#4b6423'
                        backgroundColor='#FFF'
                        value={uid}
                        logo={logoFromFile}
                        logoSize={60}
                        size={250}
                    />}
                </View>
                <View style={[globalStyles.shadow, styles.info]}>
                    <Text style={styles.title}>Name: {''}
                        <Text style={styles.textInfo}>{name}</Text>
                    </Text>
                    <Text style={styles.title}>Customer ID: {''}
                        <Text style={styles.textInfo}>{customer_id}</Text>
                    </Text>
                    <Text style={styles.title}>Children: {''}
                        <Text style={styles.textInfo}>{child ? 'Yes' : 'No'}</Text>
                    </Text>
                    <Text style={styles.title}>People in family: {''}
                        <Text style={styles.textInfo}>{noPeople}</Text>
                    </Text>
                </View>
                <Pressable
                    style={[globalStyles.button, globalStyles.green, {marginHorizontal: 30}]}
                    onLongPress={logout}
                >
                    <FontAwesomeIcon 
                        style={globalStyles.icon}
                        icon={faSignOut}
                    />
                    <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Logout</Text>
                </Pressable>
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
        paddingVertical: 40,
        paddingHorizontal: 20,
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
        color: '#4b6423'
    }
})

export default ModalUser;
