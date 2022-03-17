import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const DetailReport = ({item}) => {
    console.log(item)
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.info}>Date: <Text style={styles.label}>{item.date.toLocaleString().slice(0, 10)}</Text></Text>
        <Text style={styles.info}>Hour: <Text style={styles.label}>{item.date.toLocaleString().slice(11, 16)}</Text></Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.info}>Customer ID: <Text style={styles.label}>{item.customer_id}</Text></Text>
        <Text style={styles.info}>Items: <Text style={styles.label}>{item.amount}</Text></Text>
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
        fontWeight: '600'
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