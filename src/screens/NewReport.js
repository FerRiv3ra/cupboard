import { View, Text, Pressable, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';
import globalStyles from '../styles/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

import * as Animatable from 'react-native-animatable';
import ModalReport from './ModalReport';

const NewReport = () => {
  const today = new Date();
  const initialDate = new Date('2022-02-01');

  const [startDate, setStartDate] = useState(today);
  const [finalDate, setFinalDate] = useState(initialDate);

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartDate(initialDate);
      setFinalDate(today);
    }, 1500);
  }, [])

  const handleStartDate = (selectedDate) => {
    let date = selectedDate;
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

    setStartDate(date);
  }

  const handleFinalDate = (selectedDate) => {
    let date = selectedDate;
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())

    setFinalDate(date);
  }

  const handleNewReport = async () => {
    const [ys, ms, ds] = startDate.toISOString().slice(0, 10).split('-');
    const start = `${ds}/${ms}/${ys}`; 

    const [yf, mf, df] = finalDate.toISOString().slice(0, 10).split('-');
    const final = `${df}/${mf}/${yf}`;

    const request = await fetch(`https://grubhubbackend.herokuapp.com/api/deliveries?startDate=${start}&finalDate=${final}`)
    const response = await request.json();

    setData(response.deliveries);
    setModal(true);
  }

  const resetData = () => {
    setStartDate(initialDate);
    setFinalDate(today);
    setData([]);
    setModal(false);
  }

  return (
    <View style={[globalStyles.flex, globalStyles.green]}>
      <View style={[globalStyles.view]}>
        <Text style={[globalStyles.label, {color: '#FFF'}]}>Start date</Text>
        <View style={globalStyles.dateContainer}>
            <DatePicker 
                androidVariant='nativeAndroid'
                date={startDate}
                maximumDate={today}
                mode='date'
                onDateChange={(selectedDate) => handleStartDate(selectedDate)}
            /> 
        </View>
        <Text style={[globalStyles.label, {color: '#FFF'}]}>Final date</Text>
        <View style={globalStyles.dateContainer}>
            <DatePicker 
                androidVariant='nativeAndroid'
                date={finalDate}
                maximumDate={today}
                mode='date'
                onDateChange={(selectedDate) => handleFinalDate(selectedDate)}
            /> 
        </View>
        <Animatable.View
          animation={'bounceIn'}
          duration={2000}
          delay={1500}
        >
          <Pressable
            style={[globalStyles.button, globalStyles.orange]}
            onPress={() => handleNewReport()}
          >
            <FontAwesomeIcon 
                style={[globalStyles.icon, {color: '#FFF'}]}
                icon={faFileInvoice}
            />
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}> New Report</Text>
          </Pressable>
        </Animatable.View>
      </View>
      <Modal 
        visible={modal}
      >
        <ModalReport 
          resetData={resetData}
          data={data}
          startDate={startDate}
          finalDate={finalDate}
        />
      </Modal>
    </View>
  )
}

export default NewReport;