import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

import {
  faEnvelopeOpenText,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import globalStyles from '../styles/styles';
import DetailReport from '../components/DetailReport';

import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalReport = ({
  data = [],
  users = [],
  resetData,
  startDate,
  finalDate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSentEmail, setIsSentEmail] = useState(false);

  const visits = data.length;

  const people = users.length;

  const totalHousehold = users.reduce((tot, item) => {
    return tot + item.no_household;
  }, 0);

  const handleEmail = async () => {
    if (isSentEmail) {
      Alert.alert('Error', 'Email alredy sent');
      return;
    }

    setIsLoading(true);
    const [ys, ms, ds] = startDate.toISOString().slice(0, 10).split('-');
    const [yf, mf, df] = finalDate.toISOString().slice(0, 10).split('-');

    const dates = {
      startDate: `${ds}/${ms}/${ys}`,
      finalDate: `${df}/${mf}/${yf}`,
    };

    const token = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(
        'https://grubhubbackend.herokuapp.com/api/deliveries/email',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-token': token,
          },
          body: JSON.stringify(dates),
        },
      );
      const isSent = await response.json();

      if (isSent.error !== undefined) {
        Alert.alert('Error', isSent.error);
        setIsLoading(false);
      } else {
        Alert.alert('Information', isSent.msg);
        setIsLoading(false);
        setIsSentEmail(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Network request failed');
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.lightGreen, globalStyles.flex]}>
      <View style={globalStyles.view}>
        <Animatable.View animation={'bounceInDown'} duration={2000} delay={500}>
          <Pressable
            style={[globalStyles.button, globalStyles.green]}
            onPress={() => resetData()}>
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>X Close</Text>
          </Pressable>
        </Animatable.View>
        <Animatable.View
          style={[styles.card, globalStyles.shadow]}
          animation={'bounceInDown'}
          duration={2000}
          delay={1000}>
          <Pressable
            style={[
              styles.mailContainer,
              isSentEmail ? globalStyles.gray : globalStyles.orange,
            ]}
            onPress={() => handleEmail()}>
            {isLoading ? (
              <ActivityIndicator animating={isLoading} />
            ) : (
              <FontAwesomeIcon
                style={[globalStyles.icon]}
                icon={isSentEmail ? faEnvelope : faEnvelopeOpenText}
              />
            )}
          </Pressable>
          <Text style={styles.label}>
            Start date:
            <Text style={styles.info}> {`${startDate.toDateString()}`}</Text>
          </Text>
          <Text style={styles.label}>
            End date:
            <Text style={styles.info}> {`${finalDate.toDateString()}`}</Text>
          </Text>
          <Text style={styles.label}>
            Total people:
            <Text style={styles.info}> {`${people}`}</Text>
          </Text>
          <Text style={styles.label}>
            Total in all household:
            <Text style={styles.info}> {`${totalHousehold}`}</Text>
          </Text>
          <Text style={styles.label}>
            Total visits:
            <Text style={styles.info}> {`${visits}`}</Text>
          </Text>
        </Animatable.View>
        <Animatable.Text
          style={[globalStyles.label, globalStyles.textCenter]}
          animation={'bounceInDown'}
          duration={2000}
          delay={1500}>
          {visits === 0 ? 'Nothing to show' : 'Details'}
        </Animatable.Text>
        <Animatable.View
          animation={'bounceInDown'}
          duration={2000}
          delay={2000}>
          <FlatList
            data={users}
            keyExtractor={item => item.uid}
            renderItem={({item}) => {
              return <DetailReport item={item} />;
            }}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#444',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  info: {
    color: '#336210',
    fontSize: 18,
    fontWeight: '800',
  },
  card: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  mailContainer: {
    padding: 10,
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderRadius: 100,
  },
});

export default ModalReport;
