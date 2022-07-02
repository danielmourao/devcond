/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, {useState} from "react";
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import { Alert } from "react-native";

const Box = styled.View`
  background-color: #fff;
  border-width: 2px;
  border-color: #e8e9ed;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 10px;
`;
const HeaderArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
const InfoArea = styled.View`
  margin-left: 15px;
  flex: 1;
`;
const Title = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000;
`;
const Date = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #9c9db9;
`;
const BodyArea = styled.Text`
  font-size: 15px;
  color: #000;
  margin: 15px 0;
`;
const FooterArea = styled.View`
  flex-direction: row;
  align-items: center;
`;
const LikeBtn = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
  justify-content: center;
  align-items: center;
`;
const LikeTxt = styled.Text`
  margin-left: 5px;
  font-size: 13px;
  color: #9c9db9;
`;

export default ({data}) => {
  const [likecount, setLikeCount] = useState(data.likes);
  const [liked, setLiked] = useState(data.liked);

  const handleLike = async () => {
    setLiked(!liked);
    const result = await api.likeWallPost(data.id);
    if (result.error === '') {
      setLikeCount(result.likes);
      setLiked(result.liked);
    } else {
      Alert.alert(result.error);
    }
  };

  return (
    <Box>
      <HeaderArea>
        <Icon name="newspaper-o" size={30} color="#8b63e7"/>
        <InfoArea>
          <Title>{data.title}</Title>
          <Date>{data.datecreated}</Date>
        </InfoArea>
      </HeaderArea>
      <BodyArea>
        {data.body}
      </BodyArea>
      <FooterArea>
        <LikeBtn onPress={handleLike}>
          {liked ? <Icon name="heart" size={17} color="#ff0000" /> : <Icon name="heart-o" size={17} color="#ff0000" /> }
        </LikeBtn>
        <LikeTxt>{likecount} pessoa{likecount == 1 ? '' : 's'} curti{likecount== 1 ? 'u' : 'ram'}</LikeTxt>
      </FooterArea>
    </Box>
  );
}