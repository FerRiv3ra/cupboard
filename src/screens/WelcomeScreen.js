import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignInAlt, faCoffee} from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';

import globalStyles from '../styles/styles';

const WelcomeScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[globalStyles.flex, {backgroundColor: '#FFF'}]}>
      <View style={styles.container}>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.containerImg}>
          <Image
            style={{height: 220, width: 220}}
            source={require('../assets/logovc.png')}
          />
        </Animatable.View>
        <View>
          <Animatable.View animation={'fadeInLeftBig'} delay={1000}>
            <Pressable
              style={[
                globalStyles.button,
                globalStyles.green,
                {marginVertical: 10},
              ]}
              onPress={() => {
                navigation.navigate('Events');
              }}>
              <FontAwesomeIcon
                style={[globalStyles.icon, {color: '#FFF'}]}
                icon={faCoffee}
              />
              <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
                {' '}
                Culture Café
              </Text>
            </Pressable>
          </Animatable.View>
          <Animatable.View animation={'fadeInRightBig'} delay={1000}>
            <Pressable
              style={[
                globalStyles.button,
                globalStyles.green,
                {marginVertical: 10},
              ]}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <FontAwesomeIcon
                style={[globalStyles.icon, {color: '#FFF'}]}
                icon={faSignInAlt}
              />
              <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
                {' '}
                Community Cupboard
              </Text>
            </Pressable>
          </Animatable.View>
        </View>
        <Animatable.View
          animation={'rubberBand'}
          duration={3000}
          iterationCount={2}
          style={{marginBottom: 20}}>
          <Text style={styles.title}>Community Cupboard</Text>
          <Text style={styles.subtitle}>Opening hours</Text>
          <Text style={styles.label}>Monday - Wednesday</Text>
          <Text style={styles.label}>10am - 3pm</Text>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  containerImg: {
    alignSelf: 'center',
    marginTop: 40,
  },
  title: {
    color: '#336210',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    color: '#3E3C02',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    color: '#796D00',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default WelcomeScreen;
