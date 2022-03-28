import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import globalStyles from '../styles/styles'
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons'

const LeftAction = ({ closeSwipeable, goToCommunityCupboard, uid }) => {
  return (
    <View
      style={styles.btn}
    >
      <Pressable
        style={{ flexDirection: 'row' }}
        onPress={() => {
          closeSwipeable()
          goToCommunityCupboard(uid)
        }}
      >
        <FontAwesomeIcon
          style={[globalStyles.icon, { color: '#FFF' }]}
          icon={faHandsHelping}
          size={10}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.txtBtn}>Go to</Text>
          <Text style={styles.txtBtn}> Community</Text>
          <Text style={styles.txtBtn}>Cupboard</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default LeftAction

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#336210',
  },
  txtBtn: {
    textTransform: 'uppercase',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 12,
    color: '#FFF'
  }
})