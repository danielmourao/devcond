/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './style';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';
import WarningItem from '../../components/WarningItem';
import Icon from 'react-native-vector-icons/FontAwesome';

export default () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Livro de Ocorrências',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <C.AddButton onPress={() => navigation.navigate('WarningAddPage')}>
          <Icon name="plus" size={24} color="#000"/>
        </C.AddButton>
      ),
    });
    getWarnings();
  }, []);

  const getWarnings = async () => {
    setList([]);
    setLoading(true);
    const result = await api.getWarnings();
    setLoading(false);
    if (result.error === '') {
      setList(result.list);
    } else {
      Alert.alert(result.error);
    }
  };

  return (
    <C.Container>
        {!loading && list.length === 0 &&
          <C.NoListArea>
            <C.NoListText>Não há ocorrências desta unidade.</C.NoListText>
          </C.NoListArea>
        }
        <C.List
          data={list}
          renderItem={({item}) => <WarningItem data={item} />}
          onRefresh={getWarnings}
          refreshing={loading}
        />
    </C.Container>
  );
};
