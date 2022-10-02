import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/styles';
import {StackActions, useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFileInvoice,
  faQrcode,
  faSignOut,
  faUser,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAppContext from '../hooks/useAppContext';
import ModalAdminConfig from '../components/ModalAdminConfig';

const Cupboard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const {getAllVisitors, setIsLoading} = useAppContext();
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchMyAPI() {
      await getAllVisitors();
      setIsLoading(false);
    }

    fetchMyAPI();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log(error);
    }

    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <SafeAreaView style={[globalStyles.white, globalStyles.flex]}>
      <Animatable.View animation={'bounceInDown'} delay={500}>
        <Image
          style={{alignSelf: 'center', height: 250, width: 250}}
          source={require('../assets/ccvc.png')}
        />
      </Animatable.View>

      <Animatable.View
        style={styles.userConfig}
        animation={'bounceInDown'}
        delay={2000}>
        <Pressable onPress={() => setModalVisible(true)}>
          <FontAwesomeIcon
            style={styles.icon}
            color="#333"
            size={30}
            icon={faUserCog}
          />
        </Pressable>
      </Animatable.View>

      <View style={{position: 'absolute', width: '100%', top: '48%'}}>
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
      <View style={{bottom: 25, position: 'absolute', width: '100%'}}>
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
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <ModalAdminConfig setModalVisible={setModalVisible} />
      </Modal>
    </SafeAreaView>
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
  userConfig: {
    position: 'absolute',
    top: 50,
    right: 30,
    padding: 5,
  },
  btnLogout: [globalStyles.button, globalStyles.ccDark, globalStyles.view],
});

export default Cupboard;
