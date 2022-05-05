import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import globalStyles from '../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFileInvoice,
  faQrcode,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';

const Cupboard = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log(error);
    }

    navigation.navigate('Login');
  };

  return (
    <View
      style={[
        globalStyles.white,
        globalStyles.flex,
        {justifyContent: 'space-around'},
      ]}>
      <View style={[globalStyles.view]}>
        <Animatable.View animation={'bounceInDown'} delay={500}>
          <Image
            style={{alignSelf: 'center', height: 250, width: 250}}
            source={require('../assets/ccvc.png')}
          />
        </Animatable.View>
      </View>
      <View>
        <Animatable.View animation={'bounceInLeft'} delay={1000}>
          <Pressable
            style={styles.btnGreen}
            onPress={() => navigation.navigate('NewDelivery')}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#FFF'}]}
              icon={faQrcode}
            />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
              {' '}
              Scan QR Code
            </Text>
          </Pressable>
        </Animatable.View>
        <Animatable.View animation={'bounceInRight'} delay={1000}>
          <Pressable
            style={styles.btnGreen}
            onPress={() => navigation.navigate('Customers')}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#FFF'}]}
              icon={faUser}
            />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Users</Text>
          </Pressable>
        </Animatable.View>
        <Animatable.View animation={'bounceInLeft'} delay={1000}>
          <Pressable
            style={styles.btnGreen}
            onPress={() => navigation.navigate('NewReport')}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#FFF'}]}
              icon={faFileInvoice}
            />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
              {' '}
              New Report
            </Text>
          </Pressable>
        </Animatable.View>
      </View>
      <View>
        <Animatable.View animation={'bounceInUp'} delay={1500}>
          <Pressable style={styles.btnLogout} onPress={handleLogout}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#FFF'}]}
              icon={faSignOut}
            />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> Logout</Text>
          </Pressable>
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnGreen: [
    globalStyles.ccDarkGreen,
    globalStyles.button,
    globalStyles.view,
    {
      marginVertical: 10,
    },
  ],
  btnLogout: [globalStyles.button, globalStyles.ccDark, globalStyles.view],
});

export default Cupboard;
