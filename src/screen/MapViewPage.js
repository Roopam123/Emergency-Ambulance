import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Alert,
  Button,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import MapView, {Polyline} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import mapStyle from '../mapStyle.json';
import {getDistance} from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';

const MapViewPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [destination, setDestination] = useState('destination');
  const [userType, setUserType] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    requestLocationPersmission();
  }, []);
  useEffect(() => {
    showCordinates();
  }, []);
  useEffect(() => {
    setDestination({
      latitude: 23.25763,
      longitude: 77.43306,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, []);

  useEffect(() => {
    getUserType();
  }, []);
  const getUserType = async () => {
    const type = await AsyncStorage.getItem('user_type');
    setUserType(type);
  };
  const showCordinates = () => {
    if (currentLocation && destination) {
      const distanceInKm =
        getDistance(
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          },
          {
            latitude: destination.latitude,
            longitude: destination.longitude,
          },
        ) / 1000;
      setDistance(distanceInKm.toFixed(2));
      console.log(distance);
    }
  };

  const getUserCurrentLocation = () => {
    Geolocation.getCurrentPosition(currentPostion =>
      setCurrentLocation(currentPostion?.coords),
    );
  };
  const requestLocationPersmission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Got permission');
        setHasPermission(true);
        getUserCurrentLocation();
      } else {
        Alert.alert(
          'Permission deny',
          'Location permission is requred for the shaowing your current location',
        );
      }
    } catch (error) {
      console.log('Error on the granted permission location-->', error);
    }
  };
  return (
    <View style={styles.mapView}>
      {hasPermission && (
        <MapView
          customMapStyle={mapStyle}
          region={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={styles.map}>
          <Marker
            coordinate={{
              latitude: currentLocation?.latitude,
              longitude: currentLocation?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={data =>
              console.log('marker press-->', data.nativeEvent.coordinate)
            }>
            {userType == 'Ambulance' && (
              <Image
                source={require('../Img/emergency-ambulance.png')}
                style={{
                  width: 50,
                  height: 50,
                  transform: [{scale: 0.5}],
                }}
              />
            )}
          </Marker>
          {destination && (
            <Marker
              coordinate={destination}
              title={'destination'}
              pinColor={'blue'}
              draggable={true}>
              {userType == 'Patient'}
              {userType == 'Patient' && (
                <Image
                  source={require('../Img/emergency-ambulance.png')}
                  style={{
                    width: 50,
                    height: 50,
                    transform: [{scale: 0.5}],
                  }}
                />
              )}
              {userType == 'Ambulance' && (
                <Image
                  source={require('../Img/user.png')}
                  style={{
                    width: 50,
                    height: 50,
                    transform: [{scale: 0.5}],
                  }}
                />
              )}
            </Marker>
          )}
          {/* {currentLocation && destination && (
            <Polyline
              coordinates={[currentLocation, destination]}
              strokeWidth={2}
              strokeColor={'black'}
            />
          )} */}
          <MapViewDirections
            origin={currentLocation}
            destination={destination}
            apikey={'AIzaSyBn0T0aZ8pk114BrLoOILbjvVOofsxzIbQ'}
            strokeWidth={3}
            strokeColor="black"
          />
        </MapView>
      )}
      {destination && (
        <View style={styles.distance}>
          <Text style={styles.distancekm}>Destination:-{distance}km</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  btns: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 75,
  },
  topBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  distanceText: {
    fontSize: 20,
    marginLeft: 10,
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'white',
    borderRadius: 5,
  },
  distance: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  distancekm: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'black',
    fontWeight: '600',
  },
});

export default MapViewPage;
