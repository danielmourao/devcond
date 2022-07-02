/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './style';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';
import DocItem from '../../components/DocItem';

export default () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [docList, setDocList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Documentos do Condominio',
    });
    getDocs();
  }, []);

  const getDocs = async () => {
    setDocList([]);
    setLoading(true);
    const result = await api.getDocs();
    setLoading(false);
    if (result.error === '') {
      setDocList(result.list);
    } else {
      Alert.alert(result.error);
    }
  };

  return (
    <C.Container>
        {!loading && docList.length === 0 &&
          <C.NoListArea>
            <C.NoListText>Não há documentos.</C.NoListText>
          </C.NoListArea>
        }
        <C.List
          data={docList}
          renderItem={({item}) => <DocItem data={item} />}
          onRefresh={getDocs}
          refreshing={loading}
        />
    </C.Container>
  );
};
