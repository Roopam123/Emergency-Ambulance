import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HomeIcon from 'react-native-vector-icons/FontAwesome5';
import LiveIcons from 'react-native-vector-icons/Fontisto';
import AccountIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoLiveIcon from 'react-native-vector-icons/Fontisto';
import AccountScreen from './AccountScreen';
import MapViewPage from './MapViewPage';
import AllAmbulance from './AllAmbulance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoLive from './Ambulance/GoLive';

const HomeTab = () => {
  const [mapViewTab, setMapViewTab] = useState('MapView');
  const [allAmbulance, seAllAmbulance] = useState('');
  const [account, setAccount] = useState('');
  const [userType, setUserType] = useState('');
  const [goLive, setGoLive] = useState('');
  useEffect(() => {
    getUserType();
  }, []);

  const getUserType = async () => {
    try {
      const user_type = await AsyncStorage.getItem('user_type');
      const login_user = await AsyncStorage.getItem('user');
      console.log('Login User', login_user);
      setUserType(user_type);
    } catch (error) {
      console.log('Error on the getUserType on hometabe screen', error);
    }
  };

  return (
    <View style={styles.homeContent}>
      {/* Conditional Component Render */}
      {mapViewTab == 'MapView' && (
        <View style={styles.titleGroup}>
          <Text style={styles.title}>Search Ambulance</Text>
        </View>
      )}
      {/* conditional tabs */}
      {mapViewTab == 'MapView' && <MapViewPage />}
      {allAmbulance == 'allAmbulance' && userType == 'Patient' && (
        <AllAmbulance />
      )}
      {goLive == 'GoLive' && userType == 'Ambulance' && <GoLive />}
      {account == 'Account' && <AccountScreen />}
      {/* Buttom */}
      <View style={styles.buttomTab}>
        {/* MapView */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setMapViewTab('MapView');
            setAccount('');
            seAllAmbulance('');
            setGoLive('');
          }}>
          <HomeIcon name="home" size={18} />
          <Text style={styles.TabText}>Home</Text>
        </TouchableOpacity>
        {/* All Ambulance */}
        {userType == 'Patient' && (
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              setMapViewTab('');
              setAccount('');
              seAllAmbulance('allAmbulance');
              setGoLive('');
            }}>
            <LiveIcons name="livestream" size={16} />
            <Text style={styles.TabText}>All Ambulance</Text>
          </TouchableOpacity>
        )}
        {/* GoLive Tab */}
        {userType == 'Ambulance' && (
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              setMapViewTab('');
              seAllAmbulance('');
              setAccount('');
              setGoLive('GoLive');
            }}>
            <GoLiveIcon name="livestream" size={20} />
            <Text style={styles.TabText}>Go Live</Text>
          </TouchableOpacity>
        )}
        {/* Account Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setMapViewTab('');
            seAllAmbulance('');
            setGoLive('');
            setAccount('Account');
          }}>
          <AccountIcons name="account" size={20} />
          <Text style={styles.TabText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  homeContent: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttomTab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    position: 'absolute',
    bottom: 1,
    backgroundColor: 'white',
    elevation: 2,
    height: 70,
  },
  tab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TabText: {
    fontSize: 14,
  },
  titleGroup: {
    position: 'absolute',
    zIndex: 10,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: 'green',
  },
});

export default HomeTab;
