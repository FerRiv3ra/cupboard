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
import * as Animatable from 'react-native-animatable';
import globalStyles from '../styles/styles';
import {heightScale, withScale} from '../helpers/scale';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
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
      setIsLoading(false);
    }

    fetchMyAPI();
  }, []);

  return (
    <SafeAreaView style={[globalStyles.flex, {backgroundColor: '#FFF'}]}>
      <View style={styles.container}>
        <Animatable.View
          animation="bounceInDown"
          delay={800}
          style={styles.containerImg}>
          <Image
            style={{height: heightScale(150), width: withScale(160)}}
            source={require('../assets/culture_cafe.png')}
          />
        </Animatable.View>
        <Animatable.View animation="bounceInRight" delay={1000}>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate('Login')}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesomeIcon
                style={[globalStyles.icon, {color: '#FFF'}]}
                icon={faSignInAlt}
              />
              <Text style={styles.txtBtn}> Login</Text>
            </View>
          </Pressable>
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
        <FlatList
          data={events}
          keyExtractor={item => item._id}
          renderItem={({item, index}) => <Event item={item} index={index} />}
        />
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
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  txtBtn: {
    color: '#FFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
