import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const AmbulanceRegistar = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handelRegister = () => {
    try {
      console.log(name, email, password, mobile, confirmPassword);

      if (!name || !email || !mobile || !password || !confirmPassword) {
        Alert.alert('All fields are mandatory');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match');
        return;
      }

      const userId = uuid.v4();
      const res = firestore()
        .collection('Ambulance')
        .doc(userId)
        .set({
          name: name,
          email: email,
          mobile: mobile,
          password: password,
          userId: userId,
          vehicleNo: vehicleNo,
          userType: 'Ambulance',
        })
        .then(res => {
          console.log(res);
          Alert.alert('Registration Successful Ambulance');
          navigation.navigate('AmbulanceLogin');
          setName('');
          setEmail('');
          setMobile('');
          setPassword('');
          setConfirmPassword('');
        })
        .catch(error => {
          console.log('Error on the handelRegister app', error);
          Alert.alert('Registration failed');
        });
    } catch (error) {
      console.log('Error on the handelRegister app', error);
      Alert.alert('Registration failed');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMobile('');
    setPassword('');
    setConfirmPassword('');
  };

  const onRefresh = () => {
    setRefreshing(true);
    resetForm();
    setRefreshing(false);
  };
  return (
    <ScrollView
      style={styles.scroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.signup}>
        <StatusBar backgroundColor={'rgb(59, 103, 148)'} />
        <Text style={styles.title}>AMBULANCE SIGN UP</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>NAME</Text>
          <TextInput
            placeholder="ENTER YOUR NAME"
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>EMAIL</Text>
          <TextInput
            placeholder="ENTER YOUR EMAIL"
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>MOBILE</Text>
          <TextInput
            placeholder="ENTER YOUR MOBILE"
            style={styles.input}
            value={mobile}
            onChangeText={text => setMobile(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>VAHICAL NO.</Text>
          <TextInput
            placeholder="ENTER YOUR VAHICAL NO."
            style={styles.input}
            value={vehicleNo}
            onChangeText={text => setVehicleNo(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>PASSWORD</Text>
          <TextInput
            placeholder="ENTER YOUR PASSWORD"
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>CONFIRM PASSWORD</Text>
          <TextInput
            placeholder="ENTER YOUR CONFIRM PASSWORD"
            style={styles.input}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={handelRegister}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>
          If you are already signed up, please{' '}
          <Text
            style={styles.link}
            onPress={() => {
              navigation.goBack();
            }}>
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'rgb(59, 103, 148)',
    flex: 1,
  },
  signup: {
    display: 'flex',
    backgroundColor: 'rgb(59, 103, 148)',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    paddingTop: 40,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: 320,
    borderWidth: 0.3,
    marginTop: 8,
    borderColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  btn: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 10,
  },
  btnText: {
    color: 'black',
    paddingHorizontal: 120,
    paddingVertical: 8,
    fontSize: 22,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 17,
  },
  link: {
    color: 'blue',
    fontSize: 18,
  },
});

export default AmbulanceRegistar;
