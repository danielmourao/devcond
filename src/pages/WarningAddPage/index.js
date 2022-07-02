/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import C from './style';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera} from 'react-native-image-picker';

export default () => {
  const navigation = useNavigation();
  const [warnText, setWarnText] = useState('');
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Adicionar Ocorrência',
      // eslint-disable-next-line react/no-unstable-nested-components
    });
  }, []);

  const handleAddPhoto = async () => {
    launchCamera({mediaType: 'photo', maxWidth: 1280}, async (res) => {
      if (res?.assets) {
/*         setLoading(true);
        let result = await api.addWarningFile(res.assets[0].uri);
        setLoading(false); */
        let list = [...photoList];
        list.push(res.assets[0].uri);
        setPhotoList(list);
/*         if (result.error === '') {

          Alert.alert('deu certo');
        } else {
          Alert.alert(result.error);
        } */
      }
    });
  };

  const handleDelPhoto = (item) => {
    let list = [...photoList];
    list = list.filter(value => value != item);
    setPhotoList(list);
  };

  const handleSaveWarn = async () => {
    if (warnText !== '') {
      const result = await api.addWarning(warnText, photoList);
      if (result.error === '') {
        navigation.navigate('WarningPage');
      } else {
        Alert.alert(result.error);
      }
    } else {
      Alert.alert('Descreva a ocorrência.');
    }
  };

  return (
    <C.Container>
      <C.Scroller>
        <C.Title>Descreva a ocorrência</C.Title>
        <C.Field  placeholder="Ex: vizinho está com som alto" value={warnText} onChangeText={t => setWarnText(t)} />

        <C.Title>Fotos Relacionadas</C.Title>
        <C.PhotoArea>
          <C.PhotoScroll horizontal={true}>
            <C.PhotoAddBtn onPress={handleAddPhoto}>
              <Icon name="camera" size={24} color="#000" />
            </C.PhotoAddBtn>
            {
              photoList.map((item, index) => (
                <C.PhotoItem key={index}>
                  <C.Photo source={{uri: item}} />
                  <C.PhotoRemoveBtn onPress={() => handleDelPhoto(item)}>
                    <Icon name='remove' size={16} color="#ff0000" />
                  </C.PhotoRemoveBtn>
                </C.PhotoItem>
              ))
            }
          </C.PhotoScroll>
        </C.PhotoArea>
        {loading &&
          <C.LoadingText>Enviando foto, aguarde...</C.LoadingText>
        }
        <C.ButtonArea onPress={handleSaveWarn}>
          <C.ButtonText>Salvar</C.ButtonText>
        </C.ButtonArea>
      </C.Scroller>
    </C.Container>
  );
};
