import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Animated,
  ViewToken,
  TextInput,
} from 'react-native';
import axios from 'axios';
import ListItem from '../components/ListItem';
import {useSharedValue} from 'react-native-reanimated';
import Screen from '../components/Screen';

const PLPScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => {
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        const updatedData = response.data.map(item => ({
          ...item,
          price: 1000,
        }));
        setData(updatedData);
        setFilteredData(updatedData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };
  const handleSearch = text => {
    setSearchQuery(text);
    if (text) {
      const filteredItems = data.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filteredItems);
    } else {
      setFilteredData(data);
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <Screen style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search the Item"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Animated.FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>Can Not Show Any Data</Text>
          </View>
        )}
        onViewableItemsChanged={({viewableItems: vItems}) => {
          viewableItems.value = vItems;
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4b5970',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyList: {
    flex: 1,
    height: 200,
    width: '100%',
    backgroundColor: '#cccccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default PLPScreen;
