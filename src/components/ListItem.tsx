import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ViewToken,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ProductDetailNavigationProp} from '../navigation/types';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
type Props = {
  item: {
    id: number;
    title: string;
    thumbnailUrl: string;
    price: number;
    albumId: number;
    url: string;
  };
  viewableItems: Animated.SharedValue<ViewToken[]>;
};

const ListItem: React.FC<Props> = React.memo(({item, viewableItems}) => {
  const AnimatedStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(item => item.isViewable)
        .find(viewableItem => viewableItem.item.id === item.id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.7),
        },
      ],
    };
  }, []);
  const navigation = useNavigation<ProductDetailNavigationProp>();

  const handleItemPress = () => {
    navigation.navigate('ProductDetail', {
      item: item,
    });
  };
  return (
    <Animated.View style={AnimatedStyle}>
      <Pressable
        onPress={handleItemPress}
        style={({pressed}) => [
          styles.itemContainer,
          {backgroundColor: pressed ? '#323c45' : '#313a4a'},
        ]}
        android_ripple={{color: '#4a5966'}}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.image} />
        <View style={styles.itemDescription}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.price}>Price: {item.price}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
});

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 3,
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: 80,
    borderWidth: 0.5,
    borderColor: '#5c697d',
  },
  image: {
    width: 50,
    height: 50,
    margin: 4,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: 'white',
  },
  itemDescription: {
    flex: 4,
    marginLeft: 10,
  },
  price: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
});
