import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const AddAmbulance = () => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [ambulanceNo, setAmbulanceNo] = useState('');
  const [aadharNo, setAadharNo] = useState('');

  const handelAddAmbulance = () => {
    try {
      if (!name || !mobileNo || !ambulanceNo || !aadharNo) {
        Alert.alert('All field is mendentory');
      }
      firestore()
        .collection('ambulance')
        .doc()
        .set({
          name: name,
          mobile_no: mobileNo,
          ambulance_no: ambulanceNo,
          aadhar_no: aadharNo,
        })
        .then(() => {
          Alert.alert('Successfully Registerd Ambulance');
          setName('');
          setMobileNo('');
          setAmbulanceNo('');
          setAadharNo('');
        })
        .catch(error => {
          console.log('Error on the handelAddAmbulance function', error);
        });
    } catch (error) {
      console.log('Error on the handelAddAmbulance function', error);
    }
  };

  return (
    <ScrollView
      scrollEnabled={true}
      style={styles.scroll}
      contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}>
      <View style={styles.addAmbulance}>
        <Text style={styles.title}>Add Ambulance</Text>
        <View style={styles.form}>
          <View style={styles.inputConatiner}>
            <Text style={styles.lable}>Name</Text>
            <TextInput
              placeholder="Enter  a Name"
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.inputConatiner}>
            <Text style={styles.lable}>Mobile No.</Text>
            <TextInput
              placeholder="Enter a Mobile No."
              style={styles.input}
              value={mobileNo}
              onChangeText={text => setMobileNo(text)}
            />
          </View>
          <View style={styles.inputConatiner}>
            <Text style={styles.lable}>Ambulance No.</Text>
            <TextInput
              placeholder="Enter a Ambulance No."
              style={styles.input}
              value={ambulanceNo}
              onChangeText={text => setAmbulanceNo(text)}
            />
          </View>
          <View style={styles.inputConatiner}>
            <Text style={styles.lable}>Aadhar No.</Text>
            <TextInput
              placeholder="Enter a Aadhar No."
              style={styles.input}
              value={aadharNo}
              onChangeText={text => setAadharNo(text)}
            />
          </View>
          <TouchableOpacity onPress={handelAddAmbulance}>
            <Text style={styles.btnText}>Add Ambulance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default AddAmbulance;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  title: {
    fontWeight: '800',
    fontSize: 25,
    color: 'green',
    marginBottom: 20,
  },
  inputConatiner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 5,
    marginBottom: 10,
    height: 80,
  },
  lable: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    fontSize: 18,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: Dimensions.get('window').width * 0.9,
    marginBottom: -10,
    height: 40,
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: 'green',
    paddingVertical: 10,
    color: 'white',
    fontWeight: '600',
    borderRadius: 10,
  },
  location: {
    width: Dimensions.get('window').width * 0.9,
    height: 40,
    fontSize: 18,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
