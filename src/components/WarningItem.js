/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, {useState} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Box = styled.View`
  background-color: #fff;
  border-width: 2px;
  border-color: #e8e9ed;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
`;
const Title = styled.Text`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
`;
const Date = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #9c9db9;
  margin-bottom: 10px;
`;
const StatusArea = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;
const StatusText = styled.Text`
  font-size: 14px;
  color: #9c9db9;
  margin-left: 10px;
`;
const PhotosArea = styled.View`
  flex-direction: row;
`;
const PhotoItem = styled.TouchableOpacity`
  margin-right: 10px;
`;
const PhotoImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;
const ModalArea = styled.View`
  flex:1;
  background-color: #000;
`;
const ModalImage = styled.Image`
  flex: 1;
`;
const ModalCloseBtn = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 15px;
  right: 10px;
`;


export default ({data}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = (img) => {
    setModalImage(img);
    setShowModal(true);
  };

  return (
    <Box>
      <Date>{data.datecreated}</Date>
      <Title>{data.title}</Title>

      <StatusArea>
        <Icon name="inbox" size={24} color="#8b63e7" />;
        <StatusText>
          {data.status === 'IN_REVIEW' && 'Em Análise'}
          {data.status === 'RESOLVED' && 'Resolvido'}
        </StatusText>
      </StatusArea>

      {data.photos.length > 0 &&
        <PhotosArea>
          {data.photos.map((item, index) => (
            <PhotoItem key={index} onPress={() => openModal(item)}>
              <PhotoImage source={{uri: item}} resizeMode="cover" />
            </PhotoItem>
          ))}
        </PhotosArea>
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
      >
        <ModalArea>
          <ModalImage source={{uri: modalImage}} resizeMode="contain" />
          <ModalCloseBtn onPress={() => setShowModal(false)}>
            <Icon name="close" size={24} color="#fff" />;
          </ModalCloseBtn>
        </ModalArea>
      </Modal>
      
    </Box>
  );
}