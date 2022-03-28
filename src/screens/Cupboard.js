import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import globalStyles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileInvoice, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';

const Cupboard = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[globalStyles.white, globalStyles.flex, { justifyContent: 'space-around' }]}
    >
      <View
        style={[globalStyles.view]}
      >
        <Animatable.View
          animation={'bounceInDown'}
          delay={500}
        >
          <Image
            style={{ alignSelf: 'center', height: 250, width: 250 }}
            source={require('../assets/ccvc.png')}
          />
        </Animatable.View>
        <Animatable.View
          animation={'bounceInLeft'}
          delay={1000}
        >
          <Pressable
            style={[globalStyles.button, globalStyles.ccGreen]}
            onPress={() => navigation.navigate('NewDelivery')}
          >
            <FontAwesomeIcon
              style={[globalStyles.icon, { color: '#FFF' }]}
              icon={faHandsHelping}
            />
            <Text style={[globalStyles.textBtn, { color: '#FFF' }]}> New give away</Text>
          </Pressable>
        </Animatable.View>
        <Animatable.View
          animation={'bounceInRight'}
          delay={1000}
        >
          <Pressable
            style={[globalStyles.button, globalStyles.ccGreen]}
            onPress={() => navigation.navigate('NewReport')}
          >
            <FontAwesomeIcon
              style={[globalStyles.icon, { color: '#FFF' }]}
              icon={faFileInvoice}
            />
            <Text style={[globalStyles.textBtn, { color: '#FFF' }]}> New Report</Text>
          </Pressable>
        </Animatable.View>
      </View>
    </View>
  )
}

export default Cupboard;