import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {containerStyle, vh, vw} from '../../services/styleSheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../../services/useStatusBarCustom';
import {homeNotiIcon, searchIcon} from '../../assets/svgXML';

const StoragePage = () => {
  useStatusBar('#F9FAFF');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <View>
          <Text>StoragePage</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchBarContainer}>
        {searchIcon(vw(4), vw(4), '#1940B6')}
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm tài liệu"
          placeholderTextColor={'#A4A2A2'}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {homeNotiIcon(vw(7), vw(7), '#1940B6')}
    </View>
  );
};

export default StoragePage;

const styles = StyleSheet.create({
  container: containerStyle,
  headerStyle: {
    backgroundColor: '#F9FAFF',
    paddingVertical: vh(2),
  },
  headerContainer: {
    padding: 10,
    backgroundColor: '#F9FAFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 40,
    shadowRadius: 8,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
});
