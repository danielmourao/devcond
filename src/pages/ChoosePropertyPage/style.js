/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

export default {
  Container: styled.SafeAreaView`
    flex: 1;
  `,
  Scroller: styled.ScrollView`
    flex: 1;
    padding: 20px;
  `,
  LoadingIcon: styled.ActivityIndicator``,
  HeadTitle: styled.Text`
    font-size: 16px;
    color: #000;
    text-align: center;
    margin-top: 10px;
  `,
  LogoutButtonArea: styled.TouchableOpacity`
    background-color: #8863e6;
    padding: 15px;
    justify-content: center;
    align-items: center;
  `,
  LogoutButtonText: styled.Text`
    color: #fff;
    font-size: 15px;
    font-weight: bold;
  `,
  BigArea: styled.View`
    margin: 50px 0;
    align-items: center;
  `,
  PropertiesList: styled.View`
    margin: 20px 0;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #fff;
    border-width: 2px;
    border-color: #e8e9ed;
    border-radius: 20px;
    padding: 15px;
    align-items: center;
    margin-bottom: 10px;
  `,
  ButtonText: styled.Text`
    color: #000;
    font-size: 15px;
    font-weight: bold;
  `
};
