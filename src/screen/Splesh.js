import {View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Splesh = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [route, setRoute] = useState('PatinentLogin');
  const [user_data, setUser_Data] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const data = await AsyncStorage.getItem('user');
      setUser_Data(data);
      if (data) {
        navigation.navigate('Home');
      }
    };
    getUserData();
  }, []);

  const data = [
    {id: 1, label: 'Patinet', route: 'PatinentLogin'},
    {id: 2, label: 'Ambulance', route: 'AmbulanceLogin'},
  ];

  const handelRoute = () => {
    if (route) {
      navigation.navigate(route);
      setRoute('');
    } else {
      alert('Please select a user type');
    }
  };

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.splesh}>
      <StatusBar backgroundColor={'rgb(59, 103, 148)'} />
      <Text style={styles.spleshText}>🚑</Text>
      <Text style={styles.userTypeTitle}>Welcome to our App</Text>
      {!user_data && (
        <>
          <Text style={styles.userTypeTitle}>Please Select User Type</Text>
          <View style={styles.userTypeGroup}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                if (item.route) {
                  setValue(item.value);
                  setRoute(item.route);
                } else {
                  alert('Invalid user type selected');
                }
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
              renderItem={renderItem}
            />
          </View>
          <TouchableOpacity onPress={handelRoute}>
            <Text style={styles.btn}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  splesh: {
    flex: 1,
    backgroundColor: 'rgb(59, 103, 148)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spleshText: {
    color: 'rgb(227, 221, 34)',
    fontSize: 27,
    fontWeight: '600',
    fontSize: 50,
  },
  spleshBtn: {
    backgroundColor: 'rgb(55, 100, 222)',
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    paddingHorizontal: 30,
    paddingVertical: 6,
    fontSize: 18,
    fontWeight: '600',
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    width: Dimensions.get('window').width * 0.9,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  userTypeTitle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 25,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.9,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    paddingVertical: 8,
    borderRadius: 10,
  },
});
export default Splesh;
