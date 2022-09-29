import {View, Text, StyleSheet, ScrollView} from 'react-native';
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
        <Text style={[styles.info, {width: 40}]}>
          ID: <Text style={styles.label}>{user.customerId}</Text>
        </Text>
        <Text style={[styles.info, {width: 180}]}>
          Name:{' '}
          <Text style={styles.label}>
            {user.firstName} {user.lastName}
          </Text>
        </Text>
        <Text style={[styles.info, {width: 140}]}>
          Postcode: <Text style={styles.label}>{user.postcode}</Text>
        </Text>
        <Text style={[styles.info, {width: 100}]}>
          Visits: <Text style={styles.label}>{user.visits}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#FFF',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  info: {
    color: '#444',
    fontWeight: '600',
    textAlign: 'center',
  },
  label: {
    fontWeight: '800',
    color: '#222',
  },
  row: {
    flexDirection: 'row',
  },
});

export default DetailReport;
