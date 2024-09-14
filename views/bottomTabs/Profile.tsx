/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {centerAll, containerStyle, vh, vw} from '../../services/styleSheet';
import useStatusBar from '../../services/useStatusBarCustom';
import {
  logoutIcon,
  nextIcon,
  profileLinkIcon,
  userIcon,
} from '../../assets/svgXML';

const Profile = () => {
  useStatusBar('white');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={{marginVertical: vh(5), rowGap: vh(1)}}>
            <View style={centerAll}>
              <View style={[styles.imageContainer, centerAll]}>
                <Image
                  source={require('../../assets/profile/ring.png')}
                  style={styles.ringImage}
                />
                <Image
                  source={require('../../assets/profile/avatar.png')}
                  style={styles.avatarImage}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  color: 'black',
                  fontWeight: '900',
                  textAlign: 'center',
                }}>
                Minh Khôi
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#757575',
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                @minhkhoi111
              </Text>
            </View>
          </View>
          <View style={{rowGap: vh(3)}}>
            <TabContainer
              icon={profileLinkIcon(vw(7), vw(7))}
              title="Liên kết"
            />
            <TabContainer
              icon={userIcon(vw(7), vw(7))}
              title="Thông tin cá nhân"
            />
            <TabContainer icon={logoutIcon(vw(7), vw(7))} title="Đăng xuất" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TabContainer: React.FC<{icon: any; title: string}> = ({icon, title}) => {
  return (
    <TouchableOpacity
      disabled
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: vw(5),
      }}>
      <View style={{flexDirection: 'row', columnGap: vw(2)}}>
        {icon}
        <Text style={{color: 'black', fontSize: 16}}>{title}</Text>
      </View>
      {nextIcon(vw(5), vw(5), 'black')}
    </TouchableOpacity>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: containerStyle,
  imageContainer: {
    position: 'relative',
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
  },
  ringImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  avatarImage: {
    position: 'absolute',
    width: '90%', // Adjust the width as needed
    height: '90%', // Adjust the height as needed
    resizeMode: 'contain',
  },
});
