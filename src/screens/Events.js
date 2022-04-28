import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBackward} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import globalStyles from '../styles/styles';
import {heightScale, withScale} from '../helpers/scale';
import Event from '../components/Event';

const Events = () => {
  const navigation = useNavigation();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchMyAPI() {
      try {
        let response = await fetch(
          'https://grubhubbackend.herokuapp.com/api/events?limit=0',
        );
        response = await response.json();
        setEvents(response.events);
      } catch (error) {
        Alert.alert('Error', 'Network request failed');
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    fetchMyAPI();
  }, []);

  return (
    <SafeAreaView style={[globalStyles.flex, {backgroundColor: '#FFF'}]}>
      <View style={styles.container}>
        <Animatable.View
          animation="bounceInDown"
          delay={600}
          style={styles.containerImg}>
          <Image
            style={{height: heightScale(155), width: withScale(162)}}
            source={require('../assets/culture_cafe.png')}
          />
        </Animatable.View>
      </View>
      <View style={[globalStyles.container, globalStyles.flex]}>
        {isLoading && <ActivityIndicator animating={isLoading} size="large" />}
        {events.length === 0 && (
          <Text
            style={[
              globalStyles.label,
              globalStyles.textCenter,
              {fontSize: 12},
            ]}>
            {isLoading ? 'Loading...' : 'There are no events to show'}
          </Text>
        )}
        {!isLoading && (
          <FlatList
            data={events}
            keyExtractor={item => item._id}
            renderItem={({item, index}) => <Event item={item} index={index} />}
          />
        )}
        <Animatable.View animation="bounceInRight" delay={1500} duration={2000}>
          <Pressable
            style={[globalStyles.button, styles.btn]}
            onPress={() => navigation.goBack()}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesomeIcon
                style={[globalStyles.icon, {color: '#FFF'}]}
                icon={faBackward}
              />
              <Text style={styles.txtBtn}> Go Back</Text>
            </View>
          </Pressable>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  containerImg: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  btn: {
    backgroundColor: '#8bd3cd',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 30,
  },
  txtBtn: {
    color: '#FFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
