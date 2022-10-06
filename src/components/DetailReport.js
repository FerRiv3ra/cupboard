import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const DetailReport = ({user, index}) => {
  return (
    <View
      horizontal
      style={[
        styles.container,
        {backgroundColor: index % 2 === 0 ? '#FFF' : '#DDD'},
      ]}>
      <View style={styles.row}>
        <Text style={[styles.info, {width: 30, textAlign: 'center'}]}>
          {user.customerId}
        </Text>
        <Text style={[styles.info, {width: 110}]}>{user.firstName}</Text>
        <Text style={[styles.info, {width: 110}]}>{user.lastName}</Text>
        <Text style={[styles.info, {width: 110}]}>{user.phone}</Text>
        <Text style={[styles.info, {width: 110, textAlign: 'center'}]}>
          {user.noHousehold}
        </Text>
        <Text style={[styles.info, {width: 80, textAlign: 'center'}]}>
          {user.childCant}
        </Text>
        <Text style={[styles.info, {width: 150}]}>{user.address}</Text>
        <Text style={[styles.info, {width: 100}]}>{user.town}</Text>
        <Text style={[styles.info, {width: 80}]}>{user.postcode}</Text>
        <Text style={[styles.info, {width: 130}]}>{user.housingProvider}</Text>
        <Text style={[styles.info, {width: 90, textAlign: 'center'}]}>
          {user.pensioner ? user.pensionerCant : 'No'}
        </Text>
        <Text style={[styles.info, {width: 90, textAlign: 'center'}]}>
          {user.disabilities ? 'Yes' : 'No'}
        </Text>
        <Text style={[styles.info, {width: 80, textAlign: 'center'}]}>
          £ {user.amount}
        </Text>
        <Text style={[styles.info, {width: 50, textAlign: 'center'}]}>
          {user.visits}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    backgroundColor: '#FFF',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  info: {
    color: '#333',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
  },
});

export default DetailReport;
