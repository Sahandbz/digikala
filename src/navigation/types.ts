import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  PLPScreen: undefined;
  ProductDetail: {
    item: {id: number; title: string; thumbnailUrl: string; price: number};
  };
};

export type ProductDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;
export type ProductDetailRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>;
