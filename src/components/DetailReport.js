import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const DetailReport = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.info}>ID: <Text style={styles.label}>{item.customer_id}</Text></Text>
        <Text style={{flex: 1, textAlign: 'center'}}>-</Text>
        <Text style={styles.info}>Visits: <Text style={styles.label}>{item.visits}</Text></Text>
      </View>
    </View>
  )
}

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
        flex: 2,
        textAlign: 'center',
    },
    label: {
        fontWeight: '800',
        color: '#222'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})

export default DetailReport