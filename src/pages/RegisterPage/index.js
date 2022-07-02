/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import C from './style';
import {useNavigation} from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import { Alert } from 'react-native';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Cadastro',
    });
  }, []);

  const handleRegister = async () => {
    if (name && email && cpf && password && passwordConfirm) {
      let json = await api.register(name, email, cpf, password, passwordConfirm);
      if (json.error === ''){
        dispatch({type: 'setToken', payload: {token: json.token}});
        dispatch({type: 'setUser', payload: {user: json.user}});
        //dispatch({type: 'setProperty', payload: {property: json.properties}});

        navigation.reset({
          index: 1,
          routes: [{name: 'ChoosePropertyPage'}],
        });
      } else {
        Alert.alert(json.error);
      }
    } else {
      Alert.alert('Preencha todos os campos.');
    }
  }

  return (
    <C.Container>
      <C.Field placeholder="Digite seu Nome Completo" value={name} onChangeText={c => setName(c)} />
      <C.Field placeholder="Digite seu E-mail" value={email} onChangeText={c => setEmail(c)} />
      <C.Field placeholder="Digite seu CPF" keyboardType="numeric" value={cpf} onChangeText={c => setCPF(c)} />


      <C.Field 
        placeholder="Digite sua Senha"
        value={password}
        onChangeText={p => setPassword(p)}
        secureTextEntry={true}
      />
      <C.Field 
        placeholder="Confirme sua Senha"
        value={passwordConfirm}
        onChangeText={p => setPasswordConfirm(p)}
        secureTextEntry={true}
      />

      <C.ButtonArea onPress={handleRegister}  >
        <C.ButtonText>CADASTRAR</C.ButtonText>
      </C.ButtonArea>

    </C.Container>
  );
};
