import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingIndicator from './LoadingIndicator';
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LoadingIndicator size={50}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default LoadingScreen;