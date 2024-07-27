import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import {useRoute, RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  ProductDetail: {
    item: {
      title: string;
      url: string;
      price: number;
    };
  };
};

type PDPScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const PDPScreen: React.FC = () => {
  const {params} = useRoute<PDPScreenRouteProp>();

  return (
    <Screen hasBack headerShown pageTitle={params?.item.title}>
      <Image source={{uri: params.item.url}} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>Title: {params.item.title}</Text>
        <Text style={styles.price}>Price: ${params.item.price}</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 2,
  },
  container: {
    backgroundColor: '#4b5970',
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: 'white',
  },
});

export default PDPScreen;
