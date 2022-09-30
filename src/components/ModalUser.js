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
import useAppContext from '../hooks/useAppContext';

const ModalUser = ({resetState, fromUsers}) => {
  const fromAdmin = fromUsers !== undefined;

  const {visitorUser, selectUser} = useAppContext();
  const logoFromFile = require('../assets/logovc.png');

  useEffect(() => {
    if (!fromAdmin) {
      if (visitorUser.visits % 4 === 3) {
        Alert.alert(
          'Information',
          'One more visit and then a review must be booked',
        );
      }

      if (
        visitorUser.blocked &&
        visitorUser.visits !== 0 &&
        visitorUser.visits % 4 === 0
      ) {
        Alert.alert(
          'Information',
          'You must be book a review, please contact the staff',
        );
      }
    }
  }, []);

  const handleClose = () => {
    selectUser();
    resetState();
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <Animatable.View
          style={styles.qrCode}
          animation={'bounceIn'}
          duration={2000}
          delay={300}>
          {visitorUser.uid !== '' && (
            <QRCode
              color="#336210"
              backgroundColor="#FFF"
              value={visitorUser.uid}
              logo={logoFromFile}
              logoSize={60}
              size={250}
            />
          )}
        </Animatable.View>
        <Animatable.View
          style={[styles.info]}
          animation={'bounceIn'}
          duration={2000}
          delay={300}>
          <View style={styles.idContainer}>
            <Text style={styles.textId}>
              {visitorUser.blocked ? 'Blocked' : `#${visitorUser.customerId}`}
            </Text>
          </View>
          <Text style={styles.name}>
            {visitorUser.firstName} {visitorUser.lastName}
          </Text>
          <Text style={styles.title}>
            Number household: {''}
            <Text style={styles.textInfo}>{visitorUser.noHousehold}</Text>
          </Text>
          <Text style={styles.title}>
            Last visit: {''}
            <Text style={styles.textInfo}>
              {visitorUser.lastVisit ? visitorUser.lastVisit : 'First visit'}
            </Text>
          </Text>
          {fromAdmin && (
            <Text style={styles.title}>
              Phone: {''}
              <Text style={styles.textInfo}>{visitorUser.phone}</Text>
            </Text>
          )}
          <Text style={[styles.title, globalStyles.textCenter]}>
            {fromAdmin ? 'This user have ' : 'You have '}
            <Text style={styles.textInfo}>
              {visitorUser.blocked
                ? 0
                : visitorUser.visits === 0
                ? 4
                : 4 - (visitorUser.visits % 4)}{' '}
            </Text>
            visits left
          </Text>
          <Text style={[styles.title, globalStyles.textCenter]}>
            Total visits:{' '}
            <Text style={styles.textInfo}>{visitorUser.visits}</Text>
          </Text>
        </Animatable.View>
        <Animatable.View animation={'bounceInUp'} duration={3000} delay={700}>
          <Pressable
            style={[globalStyles.button, globalStyles.green, {margin: 30}]}
            onPress={handleClose}>
            <FontAwesomeIcon style={globalStyles.icon} icon={faSignOut} />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
              {fromAdmin ? ' Exit' : ' Logout'}
            </Text>
          </Pressable>
        </Animatable.View>
        <Animatable.View
          animation={'zoomInDown'}
          delay={800}
          style={{marginBottom: 15}}>
          {!fromAdmin ? (
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
  background: {
    flex: 1,
    backgroundColor: '#EEE',
  },
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
