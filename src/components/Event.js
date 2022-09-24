import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React from 'react';

import {heightScale} from '../helpers/scale';
const {width} = Dimensions.get('window');

const Event = ({item}) => {
  const uri =
    item.img ||
    'https://res.cloudinary.com/fercloudinary/image/upload/v1650914816/coffee-g6e5e08731_1280_cfaotc.jpg';
  return (
    <View style={styles.view}>
      <Image
        style={styles.img}
        resizeMode="cover"
        source={{
          uri,
        }}
      />
      <View style={styles.info}>
        <Text style={styles.date}>
          {new Date(item.date).toUTCString().slice(0, 16)}{' '}
          {new Date(item.date).toUTCString().slice(0, 16) ===
            new Date().toUTCString().slice(0, 16) && '(Today)'}
        </Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 5,
  },
  img: {
    width: width - 60,
    height: heightScale(140),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  info: {
    backgroundColor: '#EEE',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontWeight: '500',
    textTransform: 'uppercase',
    marginTop: 5,
  },
});
