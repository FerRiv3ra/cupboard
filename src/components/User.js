import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import globalStyles from '../styles/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

const User = ({item, setModalVisible, userEdit, userDelete}) => {
    const { name, email, dob, customer_id, role, uid } = item;
    return (
        <View style={styles.container}>
            {role === 'ADMIN_ROLE' ? 
                <View> 
                    <Text style={styles.textName}>{name}</Text>
                    <Text style={styles.text}>{email}</Text>
                </View> 
            : 
                <View> 
                    <Text style={styles.text}>Customer ID: {customer_id}</Text>
                    <Text style={styles.textName}>{name}</Text>
                    <Text style={styles.text}>{dob}</Text>
                </View> 
            }
            <View style={styles.btnContainer}>
                <Pressable 
                    style={[styles.btn, globalStyles.orange]}
                    onLongPress={() => {
                        setModalVisible(true);
                        userEdit(uid, role)
                    }}
                >
                    <FontAwesomeIcon 
                        style={[globalStyles.icon, {color: '#FFF'}]}
                        icon={faPencil}
                        size={10}
                    />
                    <Text style={styles.txtBtn}> Edit</Text>
                </Pressable>

                <Pressable 
                    style={[styles.btn, styles.btnDelete]}
                    onLongPress={() => userDelete(uid)}
                >
                    <FontAwesomeIcon 
                            style={[globalStyles.icon, {color: '#FFF'}]}
                            icon={faTrashCan}
                            size={10}
                    />
                    <Text style={styles.txtBtn}> Delete</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 15,
        borderBottomColor: '#4b6423',
        borderBottomWidth: 2
    },
    textName: {
        fontSize: 22,
        color: '#4b6423',
        fontWeight: '700',
        textTransform: 'capitalize',
    },
    text: {
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnDelete: {
        backgroundColor: '#EF4444'
    },
    txtBtn: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#FFF'
    }
});

export default User