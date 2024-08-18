import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splesh from '../screen/Splesh';
import SignUp from '../screen/SignUp';
import LoginScreen from '../screen/LoginScreen';
import HomeTab from '../screen/HomeTab';
import AmbulanceLogin from '../screen/Ambulance/AmbulanceLogin';
import AmbulanceRegistar from '../screen/Ambulance/AmbulanceRegistar';

const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splesh"
          component={Splesh}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AmbulanceSignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PatinentLogin"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AmbulanceLogin"
          component={AmbulanceLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AmbulanceRegister"
          component={AmbulanceRegistar}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
