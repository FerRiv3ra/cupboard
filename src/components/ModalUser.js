import {faSignOut} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  View,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import globalStyles from '../styles/styles';

import * as Animatable from 'react-native-animatable';

const ModalUser = ({
  userLogged,
  setModalVisible,
  modalVisible,
  resetState,
  fromUsers,
}) => {
  const FromCus = fromUsers === undefined ? false : true;
  const {
    last,
    customer_id,
    name,
    email,
    no_household,
    uid,
    visits,
    blocked,
    phone,
  } = !FromCus ? userLogged['user'] : fromUsers.user;
  const logoFromFile = require('../assets/logovc.png');

  useEffect(() => {
    if (!FromCus) {
      if (visits % 4 === 3) {
        Alert.alert(
          'Information',
          'One more visit and then a review must be booked',
        );
      }

      if (blocked && visits !== 0 && visits % 4 === 0) {
        Alert.alert(
          'Information',
          'You must be book a review, please contact the staff',
        );
      }
    }
  }, []);

  const logout = () => {
    if (FromCus) {
      fromUsers.resetState();
    } else {
      resetState();
      setModalVisible(!modalVisible);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.flex, globalStyles.lightGreen]}>
      <ScrollView>
        <Animatable.View
          style={styles.qrCode}
          animation={'bounceIn'}
          duration={2000}
          delay={300}>
          {uid !== '' && (
            <QRCode
              color="#336210"
              backgroundColor="#FFF"
              value={uid}
              logo={logoFromFile}
              logoSize={60}
              size={250}
            />
          )}
        </Animatable.View>
        <Animatable.View
          style={[globalStyles.shadow, styles.info]}
          animation={'bounceIn'}
          duration={2000}
          delay={300}>
          <View style={styles.idContainer}>
            <Text style={styles.textId}>
              {blocked ? 'Blocked' : `#${customer_id}`}
            </Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>
            Number household: {''}
            <Text style={styles.textInfo}>{no_household}</Text>
          </Text>
          <Text style={styles.title}>
            Last visit: {''}
            <Text style={styles.textInfo}>{last ? last : 'First visit'}</Text>
          </Text>
          {FromCus && !email.includes('@default') && (
            <Text style={styles.title}>
              Email: {''}
              <Text style={styles.email}>{email}</Text>
            </Text>
          )}
          {FromCus && (
            <Text style={styles.title}>
              Phone: {''}
              <Text style={styles.textInfo}>{phone}</Text>
            </Text>
          )}
          <Text style={[styles.title, globalStyles.textCenter]}>
            {FromCus ? 'This user have ' : 'You have '}
            <Text style={styles.textInfo}>
              {blocked ? 0 : visits === 0 ? 4 : 4 - (visits % 4)}{' '}
            </Text>
            visits left
          </Text>
          <Text style={[styles.title, globalStyles.textCenter]}>
            Total visits: <Text style={styles.textInfo}>{visits}</Text>
          </Text>
        </Animatable.View>
        <Animatable.View animation={'bounceInUp'} duration={3000} delay={700}>
          <Pressable
            style={[
              globalStyles.button,
              globalStyles.green,
              {marginHorizontal: 30},
            ]}
            onPress={logout}>
            <FontAwesomeIcon style={globalStyles.icon} icon={faSignOut} />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
              {FromCus ? ' Exit' : ' Logout'}
            </Text>
          </Pressable>
        </Animatable.View>
        <Animatable.View
          animation={'zoomInDown'}
          delay={800}
          style={{marginBottom: 15}}>
          {!FromCus ? (
            <>
              <Text style={[styles.title, globalStyles.textCenter]}>
                Contact details
              </Text>
              <Text style={globalStyles.textCenter}>
                communitycupboard@thevinecentre.org.uk
              </Text>
              <Text style={[globalStyles.textCenter, styles.textInfo]}>
                01252 400196
              </Text>
            </>
          ) : (
            <>
              <Text style={globalStyles.textCenter}>
                This user agrees that{' '}
              </Text>
              <Text style={globalStyles.textCenter}>
                <Text style={styles.textInfo}>The Vine Centre</Text> store their
                data
              </Text>
            </>
          )}
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  qrCode: {
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    height: 280,
    width: 280,
    borderRadius: 20,
  },
  info: {
    marginHorizontal: 30,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
  textInfo: {
    textTransform: 'capitalize',
    color: '#336210',
  },
  textId: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
  idContainer: {
    backgroundColor: '#336210',
    padding: 5,
    position: 'absolute',
    right: -10,
    top: -10,
    borderRadius: 100,
  },
  email: {
    color: '#336210',
  },
});

export default ModalUser;
