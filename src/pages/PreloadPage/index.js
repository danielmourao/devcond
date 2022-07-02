/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import api from '../../services/api';
import C from './style';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';
import { useStateValue } from '../../contexts/StateContext';

export default () => {
  const navigation = useNavigation();

  const [context, dispatch] = useStateValue();

  useEffect(() => {
    const checkLogin = async () => {
      let token = await api.getToken();
      if (token) {
        let result = await api.validateToken(token);
        if (result.error === ''){
          dispatch({type: 'setUser', payload: {user: result.user}});
          navigation.reset({
            index: 1,
            routes: [{name: 'ChoosePropertyPage'}],
          });
        } else {
          
          Alert.alert(result.error);
          
          dispatch({type: 'setToken', payload: {token: ''}});

          navigation.reset({
            index: 1,
            routes: [{name: 'LoginPage'}],
          });
        }
      } else {
        navigation.reset({
          index: 1,
          routes: [{name: 'LoginPage'}],
        });
      }
    };

    checkLogin();
  }, []);

/*   const handleLogout = async () => {
    await api.logout();
    navigation.reset({
      index: 1,
      routes: [{name: 'LoginPage'}],
    });
  }; */

  return (
    <C.Container>
      <C.LoadingIcon color="#8863e6" size="large" />
{/*       <C.ButtonLogout title="Logout" onPress={handleLogout} /> */}
    </C.Container>
  );
};
