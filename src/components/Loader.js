import {
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <StatusBar backgroundColor={'rgb(59, 103, 148)'} />
      <View style={styles.modelView}>
        <View style={styles.mainView}>
          <ActivityIndicator size={'large'} color={'rgb(59, 103, 148)'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 100,
  },
});

export default Loader;
