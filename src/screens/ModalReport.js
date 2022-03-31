import { View, Text, Pressable, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import globalStyles from '../styles/styles';
import DetailReport from '../components/DetailReport';

import * as Animatable from 'react-native-animatable';

const ModalReport = ({ data = [], users = [], resetData, startDate, finalDate }) => {
  const totalItems = data.reduce((tot, item) => {
    return tot + item.amount;
  }, 0);
  const visits = data.length;

  const usersData = new Set(data.map((del) => {
    for (const user of users) {
      if(user.customer_id === del.customer_id){
        return user
      }
    }
  }));

  const usersArr = [...usersData];
  
  const people = usersArr.length;

  const totalHousehold = usersArr.reduce((tot, item) => {
    return tot + item.no_household;
  }, 0);

  return (
    <SafeAreaView
      style={[globalStyles.lightGreen, globalStyles.flex]}
    >
      <View style={globalStyles.view}>
        <Animatable.View
          animation={'bounceInDown'}
          duration={2000}
          delay={500}
        >
          <Pressable
            style={[globalStyles.button, globalStyles.green]}
            onPress={() => resetData()}
          >
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>X Close</Text>
          </Pressable>
        </Animatable.View>
        <Animatable.View
          style={[styles.card, globalStyles.shadow]}
          animation={'bounceInDown'}
          duration={2000}
          delay={1000}
        >
          <Text style={styles.label}>Start date:
            <Text style={styles.info}> {`${startDate.toDateString()}`}</Text>
          </Text>
          <Text style={styles.label}>End date:
            <Text style={styles.info}> {`${finalDate.toDateString()}`}</Text>
          </Text>
          <Text style={styles.label}>Total people:
            <Text style={styles.info}> {`${people}`}</Text>
          </Text>
          <Text style={styles.label}>Total in all household:
            <Text style={styles.info}> {`${totalHousehold}`}</Text>
          </Text>
          <Text style={styles.label}>Total visits:
            <Text style={styles.info}> {`${visits}`}</Text>
          </Text>
          <Text style={styles.label}>Total items:
            <Text style={styles.info}> {`${totalItems}`}</Text>
          </Text>
        </Animatable.View>
        <Animatable.Text
          style={[globalStyles.label, globalStyles.textCenter]}
          animation={'bounceInDown'}
          duration={2000}
          delay={1500}
        >{visits === 0 ? 'Nothing to show' : 'Details'}</Animatable.Text>
        <Animatable.View
          animation={'bounceInDown'}
          duration={2000}
          delay={2000}
        >
          <FlatList
            data={usersArr}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => {
              return (
                <DetailReport
                  item={item}
                />
              )
            }}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  )
}

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
    fontWeight: '800'
  },
  card: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFF'
  },
})

export default ModalReport;