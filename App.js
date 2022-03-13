import React from 'react';
import 'react-native-gesture-handler';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/components/Login';
import AdminMainScreen from './src/components/AdminMainScreen';
import Customers from './src/components/Customers';
import Cupboard from './src/components/Cupboard';


const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
                name='Login'
                component={Login}
                options={{
                  title: 'Login',
                  headerShown: false
                }}
            />
            <Stack.Screen 
                name='AdminMainScreen'
                component={AdminMainScreen}
                options={{
                  title: 'Admin Screen',
                  headerShown: false
                }}
            />
            <Stack.Screen 
                name='Cupboard'
                component={Cupboard}
                options={{
                  title: 'Community Cupboard',
                  headerShown: true
                }}
            />
            <Stack.Screen 
                name='Customers'
                component={Customers}
                options={{
                  title: 'Manage Users',
                  headerShown: true
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
