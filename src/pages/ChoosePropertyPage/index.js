/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './style';
import {useNavigation} from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProperties = async () => {
      let property = await AsyncStorage.getItem('property');

      if (property) {
        property = JSON.parse(property);
        await chooseProperty(property);
      }
      setLoading(false);
    };

    checkProperties();
  }, []);

  const handleLogout = async () => {
    await api.logout();
    navigation.reset({
      index: 1,
      routes: [{name: 'LoginPage'}],
    });
  };

  const chooseProperty = async (property) => {
    await AsyncStorage.setItem('property', JSON.stringify(property));
    dispatch({type: 'setProperty', payload: {property}});

    navigation.reset({
      index: 1,
      routes: [{name: 'MainDrawer'}],
    });
  };

  return (
    <C.Container>
      <C.Scroller>
        {loading &&
          <C.LoadingIcon color="#8863e6" size="large" />
        }
        {!loading && context.user.user.properties.length > 0 && 
          <>
            <C.HeadTitle>Olá, {context.user.user.name}</C.HeadTitle>
            <C.HeadTitle>Escolha uma de suas propriedades</C.HeadTitle>
            <C.PropertiesList>
              {context.user.user.properties.map((item, index) => (
                <C.ButtonArea key={index} onPress={() => chooseProperty(item)} >
                  <C.ButtonText>{item.name}</C.ButtonText>
                </C.ButtonArea>
              ))}
            </C.PropertiesList>

          </>
        }

        {!loading && context.user.user.properties.length <= 0 &&
          <C.BigArea>
            <C.HeadTitle>{context.user.user.name}, parabéns pelo cadastro.</C.HeadTitle>
            <C.HeadTitle>Aguarde a liberação do seu acesso.</C.HeadTitle>
          </C.BigArea>
        }
      </C.Scroller>
      <C.LogoutButtonArea onPress={handleLogout}>
        <C.LogoutButtonText>SAIR</C.LogoutButtonText>
      </C.LogoutButtonArea>
    </C.Container>
  );
};
