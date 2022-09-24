import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/screens/Login';
import AdminMainScreen from './src/components/AdminMainScreen';
import Customers from './src/components/Customers';
import Cupboard from './src/screens/Cupboard';
import WelcomeScreen from './src/screens/WelcomeScreen';
import NewDelivery from './src/screens/NewDelivery';
import NewReport from './src/screens/NewReport';
import Events from './src/screens/Events';
import {AppProvider} from './src/context/AppContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              title: 'Welcome Screen',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Events"
            component={Events}
            options={{
              title: 'Culture Café',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AdminMainScreen"
            component={AdminMainScreen}
            options={{
              title: 'Admin Screen',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cupboard"
            component={Cupboard}
            options={{
              title: 'Community Cupboard',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Customers"
            component={Customers}
            options={{
              title: 'Manage Users',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="NewDelivery"
            component={NewDelivery}
            options={{
              title: 'Community Cupboard',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="NewReport"
            component={NewReport}
            options={{
              title: 'New Report',
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
