/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WallPage from '../pages/WallPage';
import DrawerCustom from '../components/DrawerCustom';
import DocumentPage from '../pages/DocumentPage';
import BilletPage from '../pages/BilletPage';
import WarningPage from '../pages/WarningPage';
import WarningAddPage from '../pages/WarningAddPage';
const Drawer = createDrawerNavigator();

export default () => {
  return(
    <Drawer.Navigator
      drawerContent={(props) => <DrawerCustom {...props} />} 
      screenOptions={
        {
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#f5f6fa',
            shadowOpacity: 0,
            elevation: 0,
          },
        }
      }
    >
      <Drawer.Screen name="WallPage" component={WallPage} />
      <Drawer.Screen name="DocumentPage" component={DocumentPage} />
      <Drawer.Screen name="BilletPage" component={BilletPage} />
      <Drawer.Screen name="WarningPage" component={WarningPage} />
      <Drawer.Screen name="WarningAddPage" component={WarningAddPage} />
    </Drawer.Navigator>
  );
}