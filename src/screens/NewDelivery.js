import { View, Text, Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import { check, PERMISSIONS } from 'react-native-permissions';
import Permission from '../components/Permission';

const NewDelivery = () => {
  const [cameraStatus, setCameraStatus] = useState('');
  const [cameraPermission, setCameraPermission] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  async function checkPermission(){
    const res = await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
    setCameraStatus(res);
    if(res === 'granted'){
      setCameraPermission(true);
    }
  } 

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 30}}>
        {!cameraPermission ? 
           <Permission 
            cameraStatus={cameraStatus}
            checkPermission={checkPermission}
            setCameraStatus={setCameraStatus}
            setCameraPermission={setCameraPermission}
           /> : 
          <Text>Camera Screen</Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  }
})

export default NewDelivery;