import { View, Text, Platform, StyleSheet, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';

import { check, PERMISSIONS } from 'react-native-permissions';
import Permission from '../components/Permission';
import { CameraScreen } from 'react-native-camera-kit';
import ModalNewDelivery from '../components/ModalNewDelivery';

const NewDelivery = () => {
  const [cameraStatus, setCameraStatus] = useState('');
  const [cameraPermission, setCameraPermission] = useState(false);

  const [uid, setUid] = useState('');
  const [modal, setModal] = useState(false);

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

  const handleQR = (event) => {
    setUid(event.nativeEvent.codeStringValue);
    setModal(true);
  }

  const resetData = () => {
    setUid('');
    setModal(false);
  }

  return (
    <View style={!cameraPermission && styles.container }>
      {!cameraPermission ? 
        <View style={{marginHorizontal: 30}}>
           <Permission 
            cameraStatus={cameraStatus}
            checkPermission={checkPermission}
            setCameraStatus={setCameraStatus}
            setCameraPermission={setCameraPermission}
          /> 
        </View> :
        <View>
          <CameraScreen
            scanBarcode={true}
            onReadCode={(event) => handleQR(event)}
            showFrame={true} 
            laserColor='red' 
            frameColor='white' 
            ratioOverlay={['1:1']}
          />
        </View>}
        <Modal
          visible={modal}
          >
          <ModalNewDelivery 
            resetData={resetData}
            uid={uid}
          />
        </Modal>
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