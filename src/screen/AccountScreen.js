import {View, Text, StyleSheet, Dimensions, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    handelUserData();
  }, []);
  const handelUserData = async () => {
    const name = await AsyncStorage.getItem('user');
    const email = await AsyncStorage.getItem('email');
    const mobile = await AsyncStorage.getItem('mobile');
    const userType = await AsyncStorage.getItem('user_type');
    setUserData({name, email, mobile, userType});
  };
  // Logout funcelity
  const handelLogOut = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('mobile');
    await AsyncStorage.removeItem('user_type')
      .then(res => {
        Alert.alert('Successfully Logout');
        navigation.navigate('Splesh');
        console.log(res);
      })
      .catch(error => {
        console.log('Error on the handelLogOut Function', error);
      });
  };
  return (
    <View style={styles.account}>
      <Text style={styles.title}>Account</Text>
      <Image
        source={require('../Img/my-passport-photo.jpg')}
        style={styles.profileImg}
      />
      <View style={styles.Info}>
        <Text style={styles.text}>Name: - {userData.name}</Text>
        <Text style={styles.text}>Email:- {userData.email}</Text>
        <Text style={styles.text}>Mobile:- {userData.mobile}</Text>
        <Text style={styles.text}>User Type:- {userData.userType}</Text>
      </View>
      <TouchableOpacity onPress={handelLogOut}>
        <Text style={styles.btntext}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  account: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    gap: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: 'black',
    color: 'green',
  },
  profileImg: {
    height: 100,
    width: 100,
    objectFit: 'cover',
    borderRadius: 100,
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  Info: {
    display: 'flex',
    gap: 5,
  },
  btntext: {
    backgroundColor: '#f04832',
    textAlign: 'center',
    paddingVertical: 10,
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    borderRadius: 20,
    marginTop: 10,
  },
});

export default AccountScreen;
