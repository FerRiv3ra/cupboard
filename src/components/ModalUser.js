import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Pressable } from 'react-native';

import QRCode from 'react-native-qrcode-svg';

const ModalUser = ({userLogged, setModalVisible, modalVisible, resetState}) => {
    const { child, customer_id, name, noPeople, uid } = (userLogged['user']);
    const logoFromFile = require('../assets/logovc.jpg');

    const logout = () => {
        resetState();
        setModalVisible(!modalVisible);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.qrCode}>
                {uid !== '' && <QRCode
                    color='#4b6423'
                    backgroundColor='#FFF'
                    value={uid}
                    logo={logoFromFile}
                    logoSize={50}
                    size={250}
                />}
            </View>
            <View style={styles.info}>
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
                style={styles.button}
                onLongPress={logout}
            >
                <Text style={styles.textBtn}>Logout</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f29100',
        flex: 1
    },
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
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
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
    },
    button:{
        marginVertical: 40,
        backgroundColor: '#4b6423',
        paddingVertical: 20,
        borderRadius: 10,
        marginHorizontal: 30
    },
    textBtn:{
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 16,
        color: '#FFF'
    },
})

export default ModalUser;
