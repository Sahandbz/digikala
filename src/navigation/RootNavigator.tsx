import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import PDPScreen from '../screens/PDPScreen';
import PLPScreen from '../screens/PLPScreen';

type Props = {};

const RootNavigator = (props: Props) => {
  const Stack = createNativeStackNavigator();
  const navigationRef = createNavigationContainerRef();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="ProductList"
          screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
          <Stack.Screen component={PLPScreen} name="ProductList" />
          <Stack.Screen component={PDPScreen} name="ProductDetail" />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
