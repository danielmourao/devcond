/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './style';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';
import WallItem from '../../components/WallItem';

export default () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [wallList, setWallList] = useState([]);

  const getWall = async () => {
    setWallList([]);
    setLoading(true);
    const result = await api.getWall();
    setLoading(false);
    if (result.error === '') {
      setWallList(result.list);
    } else {
      Alert.alert(result.error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Mural de Avisos',
    });
    getWall();
  }, []);

  return (
    <C.Container>
{/*         {loading && <C.LoadingIcon color="#8863e6" size="large" />} */}
        {!loading && wallList.length === 0 &&
          <C.NoListArea>
            <C.NoListText>Não há avisos.</C.NoListText>
          </C.NoListArea>
        }
        <C.List
          data={wallList}
          renderItem={({item}) => <WallItem data={item} />}
          onRefresh={getWall}
          refreshing={loading}
        />
    </C.Container>
  );
};
