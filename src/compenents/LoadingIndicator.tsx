import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';

const LoadingIndicator = ({size}: {size: number}) => {
  return (
     <MotiView
        from={{
            width: size ,
            height: size,
            borderRadius: size / 2,
            borderWidth: 0,
            shadowOpacity: 0.5
        }}
        animate={{
            width: size + 20,
            height: size + 20,
            borderRadius: (size + 20) / 2,
            borderWidth: size / 10,
            shadowOpacity: 1
        }}
        transition={{
            type: 'timing',
            duration: 1000,
            loop: true,
            // repeat: Infinity,
            // repeatReverse: false,
        }}
        style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size /10,
            borderColor: '#0F87CA',
            shadowColor: '#0F87CA',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10,
        }}
    />
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
};

export default LoadingIndicator;