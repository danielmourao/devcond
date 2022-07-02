/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: #f5f6fa;
    padding: 20px;
  `,
  LoadingIcon: styled.ActivityIndicator``,
  NoListArea: styled.View`
    padding: 30px;
    justify-content: center;
    align-items: center;
  `,
    NoListText: styled.Text`
    font-size: 16px;
    color: #c3c3c3;
    text-align: center;
    font-weight: bold;
  `,
  List: styled.FlatList`
    flex: 1;
  `,
};
