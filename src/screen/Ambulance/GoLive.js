import {View, Text, StyleSheet, Dimensions, Switch} from 'react-native';
import React, {useState} from 'react';

const GoLive = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    console.log(!isEnabled);
  };
  return (
    <View style={styles.goLive}>
      <Text style={styles.title}>Go Live</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>
          You want to live for the risive the patinet
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goLive: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: 'green',
  },
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default GoLive;
