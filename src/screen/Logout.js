import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Logout = () => {
  const navigate = useNavigation();
  const handelLogOut = async () => {
    await AsyncStorage.removeItem('user')
      .then(res => {
        console.log(res);
        Alert.alert('Successfully Logout user');
        navigate.navigate('Login');
      })
      .catch(err => {
        console.log('Error on a handelLout function', err);
      });
  };
  return (
    <View style={styles.logout}>
      <TouchableOpacity onPress={handelLogOut}>
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 20,
  },
});

export default Logout;
