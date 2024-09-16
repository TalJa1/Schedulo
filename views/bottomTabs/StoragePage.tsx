/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {containerStyle, vh, vw} from '../../services/styleSheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStatusBar from '../../services/useStatusBarCustom';
import {
  arrowDownIcon,
  emptyStarIcon,
  homeNotiIcon,
  searchIcon,
  threedotsIcon,
  uploadFileIcon,
} from '../../assets/svgXML';
import DocumentPicker from 'react-native-document-picker';
import {fileStorage} from '../../services/renderData';

const StoragePage = () => {
  useStatusBar('#F9FAFF');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <DescriptionContent />
        <MainContent />
      </ScrollView>
      <FloatingActionButton />
    </SafeAreaView>
  );
};

const FloatingActionButton: React.FC = () => {
  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      // Handle the picked file here
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Unknown error: ', err);
      }
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePickFile}
      style={{
        position: 'absolute',
        bottom: vh(15),
        right: vw(5),
        backgroundColor: '#1940B6',
        padding: vw(3),
        borderRadius: vw(20),
        zIndex: 2,
      }}>
      <Text style={{color: 'white'}}>{uploadFileIcon(vw(8), vw(8))}</Text>
    </TouchableOpacity>
  );
};

const MainContent: React.FC = () => {
  return (
    <View style={{paddingHorizontal: vw(5)}}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', columnGap: vw(2)}}>
        <Text style={{color: '#000000'}}>Được tôi mở lần cuối</Text>
        {arrowDownIcon(vw(4), vw(4))}
      </View>
      <View>
        {fileStorage.map((file, index) => (
          <TouchableOpacity key={index} style={styles.fileRow}>
            <Image source={{uri: file.uri}} style={styles.fileImage} />
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{file.name}</Text>
              <View style={styles.fileDateContainer}>
                <TouchableOpacity>
                  {!file.check && emptyStarIcon(vw(4), vw(4))}
                </TouchableOpacity>
                <Text style={styles.fileDate}>{file.date}</Text>
              </View>
            </View>
            <TouchableOpacity>{threedotsIcon(vw(4), vw(4))}</TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const DescriptionContent: React.FC = () => {
  return (
    <View>
      <Image
        width={vw(100)}
        resizeMode="contain"
        source={require('../../assets/fileStorage/file1.png')}
      />
      <View
        style={{
          paddingHorizontal: vw(5),
          marginVertical: vh(2),
          rowGap: vh(1),
        }}>
        <Text style={{color: '#000000', fontWeight: '700', fontSize: 16}}>
          Làm việc khi không có mạng
        </Text>
        <Text style={{color: '#000000'}}>
          Giờ đây bạn có thể mở cá tệp tài liệu học tập trên thiết bị này khi
          không có kết nối Internet. Schedulo - Lưu trữ tài liệu và học tập ở
          mọi nơi.
        </Text>
      </View>
    </View>
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
  // File row
  fileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: vw(2),
  },
  fileImage: {
    width: vw(10),
    height: vw(10),
    marginRight: vw(3),
  },
  fileInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  fileName: {
    fontSize: vw(4),
    color: '#000000',
  },
  fileDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: vw(2),
  },
  fileDate: {
    fontSize: vw(3.5),
    color: '#A4A2A2',
    marginRight: vw(2),
  },
});
