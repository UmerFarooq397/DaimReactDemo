import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';


import { StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

export default function LoginScreen(props) {
  const url = "https://croeminc-demoapi.sigmaprocess.net/api/TokenAuth/Authenticate"

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if(userName == '' || password == '') {
      Alert.alert("Invalid inputs.", 'Please enter valid data in the fields');
    }
    else {
      setLoading(true)
      authenticateUser()
    }
    
  };

  useEffect(() => {
    getData()
  },[]);

  const enableBiometricAuth = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;
  
        if (available && biometryType === BiometryTypes.TouchID) {
          Alert.alert('TouchID', 'Would you like to enable TouchID authentication for the next time?', [
            {
              text: 'Yes please',
              onPress: async () => {
                handleBiometricAuth()
                Alert.alert('Success!', 'TouchID authentication enabled successfully!');
              },
            },
            { text: 'Cancel', style: 'cancel' },
          ]);
        } else if (available && biometryType === BiometryTypes.FaceID) {
          Alert.alert('FaceID', 'Would you like to enable FaceID authentication for the next time?', [
            {
              text: 'Yes please',
              onPress: async () => {
                handleBiometricAuth()
                Alert.alert('Success!', 'FaceID authentication enabled successfully!');
              },
            },
            { text: 'Cancel', style: 'cancel' },
          ]);
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          handleBiometricAuth()
          Alert.alert('Device Supported Biometrics', 'Biometrics authentication is supported.');
        } else {
          Alert.alert('Biometrics not supported', 'This device does not support biometric authentication.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while checking biometrics availability.');
      });
  };

  const handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { success, error } = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to continue' });
  
      if (success) {
        props.navigation.navigate("HomeScreen")
        return true;
      } else {
        Alert.alert('Authentication failed', 'Biometric authentication failed');
        return false;
      }
    } catch (error) {
      console.error('[handleBiometricAuth] Error:', error);
      Alert.alert('Error', 'Biometric authentication failed from device');
      return false;
    }
  };

  const handleRegister = () => {
    handleBiometricAuth()
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('accessToken', value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken');
      if (value !== null) {
        console.log("I am here is get Data");
        // props.navigation.push("HomeScreen")
      }
    } catch (e) {
      // error reading value
    }
  };

  const authenticateUser = async () => {
    const loginRequest = {
      userNameOrEmailAddress: userName,
      password: password
    }    
    console.log('Request:: ', loginRequest);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        loginRequest
        )
    })
    .then((resp) => resp.json())
    .then((json) => {
      setData(json)
      console.log('Response:: ', json)
      
      if(json.success == true){
        console.warn("Successfully login");
        storeData(json.result.accessToken)
        props.navigation.navigate("HomeScreen")
        setUserName('')
        setPassword('')
      }
      else {
        Alert.alert("Invalid Credentials");
      }
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
     <Image source={require('./../resources/images/login_logo.png')}
      style={styles.image}
     />

      <Text style={styles.helloText}>¡Hola!</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu usuario/correo electrónico"
        placeholderTextColor="black" 
        onChangeText={text=> {setUserName(text)}}
        inputMode="email"
        value={userName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="black" 
        onChangeText={text => {setPassword(text)}}
        inputMode="text"
        value={password}
        secureTextEntry = {true}
      />
      <TouchableOpacity
        style={styles.buttons}
        onPress={handleLogin}
        disabled={loading}
      >
      <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.buttonSpacer}></View>
      <TouchableOpacity
        style={styles.buttons}
        onPress={handleRegister}
      ><Text style={styles.buttonText}>Ingresar con huella</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color="#50A5F1" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1FD',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '60%',
    height: '20%',
    resizeMode: 'contain',
  },
  helloText: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  buttons: {
    backgroundColor: '#0F87CA',
    padding: 12,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffff'
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#0F87CA',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  buttonSpacer: {
    height: 10,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});