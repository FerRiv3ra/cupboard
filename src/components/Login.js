import React, { useState, useEffect } from 'react';
import { Text, Image, SafeAreaView, StyleSheet, View } from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AsAdmin from './AsAdmin';
import AsUser from './AsUser';
import { radioButtonsData, resetRadioData } from '../helpers/radioButtonsData';
import globalStyles from '../styles/styles';

const Login = () => {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    return () => {
      resetRadioData();
      handleRadio(radioButtonsData);
    }
  }, []);

  const handleRadio = (arrRbts) => {
    setRadioButtons(arrRbts);
    setIsAdmin(radioButtonsData[1].selected);
  }

  return (
    <SafeAreaView style={[styles.container, globalStyles.white]}>
      <KeyboardAwareScrollView>
        <View style={styles.containerLogo}>
          <Image
            style={styles.logo}
            source={require('../assets/lvc.png')}
          />
        </View>
        <View style={[styles.view, { backgroundColor: '#EEE' }]}>
          <Text style={styles.label}>Login as</Text>
          <RadioGroup
            radioButtons={radioButtons}
            layout='row'
            onPress={(arrRbts) => handleRadio(arrRbts, setRadioButtons, setIsAdmin, isAdmin)}
          />
        </View>
        {
          !isAdmin
            ? <AsUser />
            : <AsAdmin />}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  containerLogo: {
    alignSelf: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
  view: {
    alignItems: 'center',
    paddingTop: 10,
    borderTopLeftRadius: 50,
  },
  label: {
    fontSize: 12
  }
})

export default Login;