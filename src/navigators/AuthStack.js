/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PreloadPage from '../pages/PreloadPage';
import LoginPage from '../pages/LoginPage';
import ChoosePropertyPage from '../pages/ChoosePropertyPage';
import RegisterPage from '../pages/RegisterPage';
import MainDrawer from './MainDrawer';


const Stack = createStackNavigator();
export default () => {
  return(
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#f5f6fa',
      },
    }}>
      <Stack.Screen name='PreloadPage' component={PreloadPage} options={{headerShown: false}} />
      <Stack.Screen name='LoginPage' component={LoginPage} options={{headerShown: false}}/>
      <Stack.Screen name='ChoosePropertyPage' component={ChoosePropertyPage} options={{headerShown: false}} />
      <Stack.Screen name='RegisterPage' component={RegisterPage} />
      <Stack.Screen name='MainDrawer' component={MainDrawer} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}