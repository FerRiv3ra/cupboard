import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons'
import { request, PERMISSIONS } from 'react-native-permissions';

import globalStyles from '../styles/styles'

const Permission = ({ cameraStatus, checkPermission, setCameraStatus, setCameraPermission }) => {
  const handlePermision = async () => {
    const res = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
    setCameraStatus(res);
    if (res === 'granted') {
      setCameraPermission(true);
    }
    checkPermission();
  }

  return (
    <View>
      <View style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require('../assets/logovc.png')}
        />
      </View>
      <Text
        style={[globalStyles.label, globalStyles.textCenter]}
      >This screen require camera permission to scan QR codes</Text>
      {cameraStatus === 'denied' ?
        <Pressable
          style={[globalStyles.button, globalStyles.green]}
          onPress={() => handlePermision()}
        >
          <FontAwesomeIcon
            style={[globalStyles.icon, { color: '#FFF' }]}
            icon={faUnlockAlt}
          />
          <Text style={[globalStyles.textBtn, { color: '#FFF' }]}> grant permissions</Text>
        </Pressable> :
        <Text
          style={[globalStyles.label, globalStyles.textCenter]}
        >Please go to settings and allow permission to access to the camera</Text>}
    </View>
  )
}

export default Permission

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
  containerLogo: {
    alignSelf: 'center',
    marginBottom: 20
  },
})