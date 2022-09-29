import {View, Text, Pressable, Modal, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import globalStyles from '../styles/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons';

import * as Animatable from 'react-native-animatable';
import ModalReport from './ModalReport';
import moment from 'moment';
import useAppContext from '../hooks/useAppContext';

const NewReport = () => {
  const today = new Date(moment.utc(moment()).format());
  const initialDate = new Date(moment.utc('2022-09-01').format());

  const [startDate, setStartDate] = useState(today);
  const [finalDate, setFinalDate] = useState(initialDate);

  const [modalVisible, setModalVisible] = useState(false);

  const {getAllVisits} = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      setStartDate(initialDate);
      setFinalDate(today);
    }, 1000);
  }, []);

  const handleNewReport = async () => {
    try {
      const resp = await getAllVisits(
        moment(startDate).format('DD/MM/YYYY'),
        moment(finalDate).format('DD/MM/YYYY'),
      );

      if (!resp.ok) {
        Alert.alert('Error', resp.msg);
        return;
      }

      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'Network request failed');
    }
  };

  const resetData = () => {
    setStartDate(initialDate);
    setFinalDate(today);
    setModalVisible(false);
  };

  return (
    <View style={[globalStyles.flex, {backgroundColor: '#EEE'}]}>
      <View style={[globalStyles.view]}>
        <Text style={[globalStyles.label]}>Start date</Text>
        <View style={globalStyles.dateContainer}>
          <DatePicker
            androidVariant="nativeAndroid"
            date={startDate}
            maximumDate={today}
            mode="date"
            onDateChange={setStartDate}
          />
        </View>
        <Text style={[globalStyles.label]}>End date</Text>
        <View style={globalStyles.dateContainer}>
          <DatePicker
            androidVariant="nativeAndroid"
            date={finalDate}
            maximumDate={today}
            mode="date"
            onDateChange={setFinalDate}
          />
        </View>
        <Animatable.View animation={'bounceIn'} duration={2000} delay={1000}>
          <Pressable
            style={[globalStyles.button, globalStyles.green, {marginTop: 20}]}
            onPress={() => handleNewReport()}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#FFF'}]}
              icon={faFileInvoice}
            />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
              {' '}
              New Report
            </Text>
          </Pressable>
        </Animatable.View>
      </View>
      <Modal visible={modalVisible}>
        <ModalReport
          resetData={resetData}
          startDate={startDate}
          finalDate={finalDate}
        />
      </Modal>
    </View>
  );
};

export default NewReport;
