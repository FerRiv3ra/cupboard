import {Text, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheck,
  faExclamation,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';

const ShowAlert = ({title = '', type = 'success'}) => {
  const color =
    type === 'success' ? 'green' : type === 'warning' ? 'orange' : 'red';
  const icon =
    type === 'success'
      ? faCheck
      : type === 'warning'
      ? faWarning
      : faExclamation;

  return (
    <View style={{flexDirection: 'row', marginVertical: 3}}>
      <FontAwesomeIcon style={{color: color}} icon={icon} />
      <Text
        style={{
          marginLeft: 10,
          color: color,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default ShowAlert;
