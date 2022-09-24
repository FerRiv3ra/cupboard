import React, {useState} from 'react';
import {Text, Image, SafeAreaView, StyleSheet, View} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import AsAdmin from '../components/AsAdmin';
import AsUser from '../components/AsUser';
import globalStyles from '../styles/styles';
import SegmentedControl from '../components/SegmentedControls';

const Login = () => {
  const [role, setRole] = useState('user');

  return (
    <SafeAreaView style={[styles.container, globalStyles.white]}>
      <KeyboardAwareScrollView>
        <View style={styles.containerLogo}>
          <Image style={styles.logo} source={require('../assets/lvc.png')} />
        </View>
        <View style={styles.view}>
          <Text>Login as</Text>
          <SegmentedControl
            values={[
              {key: 'VISITOR', value: 'user'},
              {key: 'ADMIN', value: 'admin'},
            ]}
            onChange={setRole}
            textColor="#222"
          />
        </View>
        {role === 'user' ? <AsUser /> : <AsAdmin />}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
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
    backgroundColor: '#EEE',
    paddingHorizontal: 30,
  },
});

export default Login;
