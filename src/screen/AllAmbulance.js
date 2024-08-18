import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const AllAmbulance = () => {
  const [ambulanceData, setAmbulanceData] = useState([]);

  useEffect(() => {
    getAmbulanceData();
  }, []);

  const getAmbulanceData = async () => {
    try {
      const ambulance = await firestore().collection('Ambulance').get();
      const ambulanceData = ambulance.docs.map(doc => doc.data());
      setAmbulanceData(ambulanceData);
    } catch (error) {
      console.log('Error on the GetAmbulanceData function', error);
    }
  };
  return (
    <View style={styles.live}>
      <Text style={styles.title}>All Ambulance</Text>
      <View style={styles.ambulanceList}>
        <FlatList
          data={ambulanceData}
          renderItem={({item}) => (
            <View style={styles.list}>
              <Image
                source={require('../Img/ambulance.png')}
                style={styles.amIcon}
              />
              <View>
                <View style={styles.listLeft}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.right}>
                  <Text style={styles.mobile}>{'+91' + item.mobile}</Text>
                  <Text style={styles.vehical}>
                    {item.vehicleNo.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  live: {
    display: 'flex',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: 'green',
    marginBottom: 10,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
  },
  amIcon: {
    width: 60,
    height: 60,
    objectFit: 'contain',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    backgroundColor: '#a8a7a7',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  mobile: {
    color: 'green',
    fontSize: 16,
    marginRight: 10,
  },
  vehical: {
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
  },
  aadhar: {
    fontSize: 15,
    color: 'black',
  },
});

export default AllAmbulance;
