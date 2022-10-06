import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  faEnvelopeOpenText,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import globalStyles from '../styles/styles';
import DetailReport from '../components/DetailReport';

import * as Animatable from 'react-native-animatable';
import useAppContext from '../hooks/useAppContext';
import moment from 'moment';

const ModalReport = ({resetData, startDate, finalDate}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSentEmail, setIsSentEmail] = useState(false);
  const [visits, setVisits] = useState(0);
  const [people, setPeople] = useState(0);
  const [totalHousehold, setTotalHousehold] = useState(0);
  const [users, setUsers] = useState([]);

  const {report, sendEmail} = useAppContext();
  const {height} = useWindowDimensions();

  useEffect(() => {
    const {usersArr, visits: dataVisits} = report;
    setVisits(dataVisits.length);
    setPeople(usersArr.length);

    setUsers(
      usersArr.map(user => {
        const amount = dataVisits.reduce((total, visit) => {
          if (visit.customerId === user.customerId) {
            total += visit.amount;
          }

          return total;
        }, 0);

        user.amount = amount;

        return user;
      }),
    );

    setTotalHousehold(
      usersArr.reduce((tot, item) => {
        return tot + item.noHousehold;
      }, 0),
    );
  }, []);

  const handleEmail = async () => {
    if (isSentEmail) {
      Alert.alert('Error', 'Email alredy sent');
      return;
    }

    setIsLoading(true);

    const dates = {
      startDate: moment(startDate).format('DD/MM/YYYY'),
      finalDate: moment(finalDate).format('DD/MM/YYYY'),
    };

    const resp = await sendEmail(dates);

    if (!resp.ok) {
      Alert.alert('Error', isSent.error);
      setIsLoading(false);
      return;
    }

    Alert.alert('Information', resp.msg);
    setIsLoading(false);
    setIsSentEmail(true);
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.view}>
        <Animatable.View
          style={styles.card}
          animation={'bounceInDown'}
          duration={2000}
          delay={1000}>
          <Pressable
            style={[
              styles.mailContainer,
              isSentEmail ? globalStyles.gray : globalStyles.orange,
            ]}
            onPress={handleEmail}>
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
          style={[styles.reportContainer, {height: height - 360}]}
          animation={'bounceInDown'}
          duration={2000}
          delay={2000}>
          <ScrollView horizontal>
            <ScrollView>
              <View style={styles.titles}>
                <Text style={[styles.thead, {width: 30, textAlign: 'center'}]}>
                  ID
                </Text>
                <Text style={[styles.thead, {width: 110}]}>First name</Text>
                <Text style={[styles.thead, {width: 110}]}>Last name</Text>
                <Text style={[styles.thead, {width: 110}]}>Phone number</Text>
                <Text style={[styles.thead, {width: 110, textAlign: 'center'}]}>
                  Number in household
                </Text>
                <Text style={[styles.thead, {width: 80, textAlign: 'center'}]}>
                  Children
                </Text>
                <Text style={[styles.thead, {width: 150}]}>Address</Text>
                <Text style={[styles.thead, {width: 100}]}>Town</Text>
                <Text style={[styles.thead, {width: 80}]}>Postcode</Text>
                <Text style={[styles.thead, {width: 130}]}>
                  Housing provider
                </Text>
                <Text style={[styles.thead, {width: 90, textAlign: 'center'}]}>
                  Pensioners
                </Text>
                <Text style={[styles.thead, {width: 90, textAlign: 'center'}]}>
                  Disabilities
                </Text>
                <Text style={[styles.thead, {width: 80, textAlign: 'center'}]}>
                  Total donation
                </Text>
                <Text style={[styles.thead, {width: 50, textAlign: 'center'}]}>
                  Visits
                </Text>
              </View>
              {users.map((user, index) => (
                <DetailReport user={user} key={user.uid} index={index} />
              ))}
            </ScrollView>
          </ScrollView>
        </Animatable.View>
        <Animatable.View animation={'bounceInDown'} duration={2000} delay={500}>
          <Pressable
            style={[globalStyles.button, globalStyles.green, {marginTop: 20}]}
            onPress={() => resetData()}>
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>X Close</Text>
          </Pressable>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EEE',
  },
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
    height: 150,
  },
  mailContainer: {
    padding: 10,
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderRadius: 100,
  },
  reportContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  titles: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
    backgroundColor: '#336210',
  },
  thead: {
    fontWeight: '700',
    marginVertical: 'auto',
    paddingVertical: 3,
    color: '#FFF',
  },
  view: {
    marginHorizontal: 10,
  },
});

export default ModalReport;
