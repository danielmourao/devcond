/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import C from './style';
import {useNavigation} from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import { Alert } from 'react-native';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginButton = async () => {
    if (cpf && password) {
      let result = await api.loginValidate(cpf, password);
      if (result.error === '') {

        dispatch({type: 'setToken', payload: {token: result.token}});
        dispatch({type: 'setUser', payload: {user: result.user}});
        dispatch({type: 'setProperty', payload: {property: result.property}});

        navigation.reset({
          index: 1,
          routes: [{name: 'ChoosePropertyPage'}],
        });
      } else {
        Alert.alert(result.error);
      }
    } else {
      Alert.alert("Preencha os campos.");
    }
  };

  const handleRegisterButton = () => {
    navigation.navigate('RegisterPage');
  };

  return (
    <C.Container>
      <C.Logo  source={require('../../assets/undraw_home.png')} resizeMode="contain" />
      <C.Field placeholder="Digite seu CPF" keyboardType="numeric" value={cpf} onChangeText={c => setCPF(c)} />
      <C.Field 
        placeholder="Digite sua Senha"
        value={password}
        onChangeText={p => setPassword(p)}
        secureTextEntry={true}
      />
      <C.ButtonArea onPress={handleLoginButton}  >
        <C.ButtonText>ENTRAR</C.ButtonText>
      </C.ButtonArea>

      <C.ButtonArea onPress={handleRegisterButton} >
        <C.ButtonText>CADASTRAR-SE</C.ButtonText>
      </C.ButtonArea>
    </C.Container>
  );
};
