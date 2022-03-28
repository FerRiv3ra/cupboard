import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { SafeAreaView, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import globalStyles from '../styles/styles';

import * as Animatable from 'react-native-animatable';

const ModalUser = ({ userLogged, setModalVisible, modalVisible, resetState, fromUsers }) => {
  const FromCus = fromUsers === undefined ? false : true;
  const { child, child_cant, customer_id, name, single, uid, phone, email = '' } = (!FromCus ? userLogged['user'] : fromUsers.user);
  const logoFromFile = require('../assets/logovc.png');

  const logout = () => {
    if (FromCus) {
      fromUsers.resetState();
    } else {
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
            color='#336210'
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
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>Customer ID: {''}
            <Text style={styles.textInfo}>{customer_id}</Text>
          </Text>
          <Text style={styles.title}>Children: {''}
            <Text style={styles.textInfo}>{child ? child_cant : 'No'}</Text>
          </Text>
          <Text style={styles.title}>Kind of household: {''}
            <Text style={styles.textInfo}>{single ? 'Single' : 'Couple'}</Text>
          </Text>
          {phone && <Text style={styles.title}>Phone: {''}
            <Text style={styles.textInfo}>{phone ?? ''}</Text>
          </Text>}
          {!email.includes('@default') && <Text style={styles.title}>Email: {''}
            <Text style={styles.email}>{email}</Text>
          </Text>}
        </Animatable.View>
        <Animatable.View
          animation={'bounceInUp'}
          duration={3000}
          delay={700}
        >
          <Pressable
            style={[globalStyles.button, globalStyles.green, { marginHorizontal: 30 }]}
            onLongPress={logout}
          >
            <FontAwesomeIcon
              style={globalStyles.icon}
              icon={faSignOut}
            />
            <Text style={[globalStyles.textBtn, { color: '#FFF' }]}>{FromCus ? ' Exit' : ' Logout'}</Text>
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
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000'
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  textInfo: {
    textTransform: 'capitalize',
    fontWeight: '800',
    color: '#336210'
  },
  email: {
    color: '#336210'
  }
})

export default ModalUser;
