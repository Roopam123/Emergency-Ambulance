import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

const AmbulanceLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const handelLogin = () => {
    setVisible(true);
    firestore()
      .collection('Ambulance')
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        if (res.docs[0] != []) {
          const data = res.docs[0].data();
          console.log('loginData===>', data);
          Alert.alert('Successfully login');
          handelDataSave(data);
        } else {
          Alert.alert('User not found');
        }
      })
      .catch(error => {
        setVisible(false);
        Alert.alert(
          'User not found please register or enter the valid email and password',
        );
        console.log('error on the handelLogin function', error);
      });
  };

  const handelDataSave = async data => {
    try {
      await AsyncStorage.setItem('user', data.name);
      await AsyncStorage.setItem('email', data.email);
      await AsyncStorage.setItem('mobile', data.mobile);
      await AsyncStorage.setItem('user-id', data.userId);
      await AsyncStorage.setItem('user_type', data.user_type);
      console.log('Successfully user data save');
      console.log('Your user type is', data.user_type);
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error on the data save on the Async Storage', error);
    }
  };
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.signup}>
        <StatusBar backgroundColor={'rgb(59, 103, 148)'} />
        <Text style={styles.title}>Ambulance Login 🚑</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>EMAIL</Text>
          <TextInput
            placeholder="ENTER YOUR EMAIL"
            style={styles.input}
            value={email}
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputText}>PASSWORD</Text>
          <TextInput
            placeholder="ENTER YOUR PASSWORD"
            style={styles.input}
            value={password}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={handelLogin}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>
          if your not signup,Please SignUp{' '}
          <Text
            style={styles.link}
            onPress={() => {
              navigation.navigate('AmbulanceRegister');
            }}>
            SignUp
          </Text>
        </Text>
      </View>
      <Loader visible={visible} />
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
    paddingTop: 90,
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

export default AmbulanceLogin;
