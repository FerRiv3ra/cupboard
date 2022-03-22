import React from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import globalStyles from '../styles/styles'
import DatePicker from 'react-native-date-picker'
import { RadioGroup } from 'react-native-radio-buttons-group'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const FormUser = (props) => {
    const {name, 
        setName, 
        email, 
        setEmail, 
        password, 
        setPassword, 
        confirmPass, 
        setConfirmPass, 
        date, 
        today, 
        handleDate, 
        setAddress, 
        address, 
        setPostcode, 
        postcode, 
        phone, 
        setPhone, 
        setNoPeople, 
        noPeople, 
        handleRadioChild, 
        handleCreate, 
        isAdmin, 
        radioChild, 
        uid
    } = props;

    return (
        <KeyboardAwareScrollView>
            <Text style={globalStyles.label}>Name (required)</Text>
            <TextInput 
                style={globalStyles.input}
                placeholder='Name'
                keyboardType='default'
                placeholderTextColor={'#666'}
                onChangeText={setName}
                value={name}
                autoCapitalize={'words'}
            /> 
            <Text style={globalStyles.label}>{`Email ${isAdmin ? '(required)' : '(optional)'}`}</Text>
            <TextInput 
                style={globalStyles.input}
                placeholder='Email'
                keyboardType='email-address'
                textContentType='emailAddress'
                placeholderTextColor={'#666'}
                onChangeText={setEmail}
                value={email}
                autoCapitalize={'none'}
            /> 
            {isAdmin && <View>
                <Text style={globalStyles.label}>Password</Text>
                <TextInput 
                    style={globalStyles.input}
                    secureTextEntry={true}
                    textContentType='password'
                    placeholder='Password'
                    placeholderTextColor={'#666'}
                    onChangeText={setPassword}
                    value={password}
                    autoCapitalize={'none'}
                /> 
                <Text style={globalStyles.label}>Confirm Password</Text>
                <TextInput 
                    style={globalStyles.input}
                    secureTextEntry={true}
                    textContentType='password'
                    placeholder='Confirm Password'
                    placeholderTextColor={'#666'}
                    onChangeText={setConfirmPass}
                    value={confirmPass}
                    autoCapitalize={'none'}
                />  
            </View>} 
            <Text style={globalStyles.label}>Date of birth</Text>
            <View style={globalStyles.dateContainer}>
            <DatePicker 
                androidVariant='nativeAndroid'
                date={date}
                maximumDate={today}
                mode='date'
                onDateChange={(selectedDate) => handleDate(selectedDate)}
            /> 
            </View>
            <Text style={globalStyles.label}>Address (required)</Text>
            <TextInput 
                style={globalStyles.input}
                placeholder='Address'
                keyboardType='default'
                textContentType='addressCity'
                placeholderTextColor={'#666'}
                onChangeText={setAddress}
                value={address}
            /> 
            <Text style={globalStyles.label}>Postcode (required)</Text>
            <TextInput 
                style={globalStyles.input}
                placeholder='Postcode'
                keyboardType='default'
                textContentType='postalCode'
                placeholderTextColor={'#666'}
                onChangeText={setPostcode}
                value={postcode}
            /> 
            <Text style={globalStyles.label}>Phone (optional)</Text>
            <TextInput 
                style={globalStyles.input}
                placeholder='Phone'
                textContentType='telephoneNumber'
                keyboardType='phone-pad'
                placeholderTextColor={'#666'}
                onChangeText={setPhone}
                value={phone}
            /> 
            {!isAdmin && 
                <View>
                    <Text style={globalStyles.label}>People in household</Text>
                    <TextInput 
                        style={globalStyles.input}
                        placeholder='People in household'
                        keyboardType='number-pad'
                        placeholderTextColor={'#666'}
                        onChangeText={setNoPeople}
                        value={noPeople}
                    /> 
                    <View style={{alignSelf: 'center'}} >
                        <Text style={[globalStyles.label, globalStyles.textCenter]}>Children in family</Text>
                        <RadioGroup
                            radioButtons={radioChild} 
                            layout='row'
                            onPress={(arrRbtsC) => handleRadioChild(arrRbtsC)} 
                        />
                    </View>
                </View>
            }
            <Pressable
                style={[globalStyles.button, globalStyles.green]}
                onPress={handleCreate}
            >
                {
                    uid !== '' && 
                    <FontAwesomeIcon 
                        style={[globalStyles.icon, {color: '#FFF'}]}
                        icon={faSave}
                    />
                }
                <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>{uid === '' ? '+ Create' : ' Save'}</Text>
            </Pressable>
        </KeyboardAwareScrollView>
    )
}

export default FormUser