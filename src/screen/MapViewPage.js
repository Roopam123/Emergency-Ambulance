import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Alert,
  Button,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Polyline} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import mapStyle from '../mapStyle.json';
import {getDistance} from 'geolib';
import MapViewDirections from 'react-native-maps-directions';

const MapViewPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  // part two
  const [source, setSource] = useState('');
  const [isSource, setIsSource] = useState(false);
  const [destination, setDestination] = useState('');
  const [isDestination, setIsDestination] = useState('');

  // Distance
  const [distance, setDistance] = useState('');

  useEffect(() => {
    requestLocationPersmission();
  }, []);

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

  // It will work when we are Trying to the
  const handelMapPress = e => {
    const cordinates = e.nativeEvent.coordinate;
    console.log('map on tab cordinate', cordinates);
    if (isSource) {
      setSource(cordinates);
      setIsSource(false);
    } else if (isDestination) {
      setDestination(cordinates);
      setIsDestination(cordinates);
    }
  };

  // for the finding the distance beetween two cordinates
  const showCordinates = () => {
    if (source && destination) {
      const distanceInKm =
        getDistance(
          {
            latitude: source.latitude,
            longitude: source.longitude,
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
          onPress={handelMapPress}
          style={styles.map}>
          <Marker
            coordinate={{
              latitude: currentLocation?.latitude,
              longitude: currentLocation?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            // title={'Test'}
            // description={'Hello I am Testing'}
            onPress={data =>
              console.log('marker press-->', data.nativeEvent.coordinate)
            }
          />
          {source && (
            <Marker
              coordinate={source}
              title={'source'}
              pinColor={'green'}
              draggable={true}
            />
          )}
          {destination && (
            <Marker
              coordinate={destination}
              title={'destination'}
              pinColor={'blue'}
              draggable={true}
            />
          )}
          {source && destination && (
            <Polyline
              coordinates={[source, destination]}
              strokeWidth={2}
              strokeColor={'black'}
            />
          )}
          {/* {source && destination && (
            <MapViewDirections
              origin={source}
              destination={destination}
              apikey={'AIzaSyAEhY4qtMB9SiXG4JCyX9KUKd4Odr7900g'}
              strokeWidth={3}
              strokeColor={'blue'}
            />
          )} */}
        </MapView>
      )}
      <View style={styles.btns}>
        <View style={styles.topBtn}>
          <Button title="Start" onPress={() => setIsSource(true)} />
          <Button title="End" onPress={() => setIsDestination(true)} />
        </View>
        <View style={styles.topBtn}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Button title="Total Distance" onPress={showCordinates} />
            {distance && (
              <Text style={styles.distanceText}>= {distance}km</Text>
            )}
          </View>
          <Button
            title="Reset"
            onPress={() => {
              setSource('');
              setDestination('');
              setDistance('');
            }}
          />
        </View>
      </View>
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
});

export default MapViewPage;
