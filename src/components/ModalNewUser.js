import {View, Pressable, SafeAreaView, StyleSheet, Image} from 'react-native';
import React from 'react';
import globalStyles from '../styles/styles';

import FormUser from './FormUser';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useAppContext from '../hooks/useAppContext';

const ModalNewUser = ({setModalVisible, edit}) => {
  const {selectUser} = useAppContext();

  return (
    <KeyboardAwareScrollView style={styles.background}>
      <SafeAreaView>
        <View>
          <Image
            style={styles.image}
            source={require('../assets/logovc.png')}
          />
          <Pressable
            style={[globalStyles.orange, styles.buttonClose]}
            onPress={() => {
              selectUser();
              setModalVisible(false);
            }}>
            <FontAwesomeIcon color="#FFF" icon={faClose} size={24} />
          </Pressable>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <FormUser setModalVisible={setModalVisible} edit={edit} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    marginHorizontal: 30,
  },
  buttonClose: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 10,
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default ModalNewUser;
