import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import FormInput from './../compenents/Forminput';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';


import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { LoadingScreen} from './../compenents/LoadingScreen'


const formSchema = z.object({
  // email: z.string().email('Please enter a valid email'),
  userName: z.string().min(4, 'Password must be at least 4 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginScreen(props) {

  const { control, handleSubmit } = useForm({
    defaultValues: {
    userName: '',
    password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const url = "https://croeminc-demoapi.sigmaprocess.net/api/TokenAuth/Authenticate"

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = (formData) => {
    const userName = formData.userName
    const password = formData.password
    if(userName == '' || password == '') {
      Alert.alert("Invalid inputs.", 'Please enter valid data in the fields');
    }
    else {
      // setLoading(true)
      authenticateUser(userName, password)
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

  const authenticateUser = async (userName, password) => {
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
      <FormInput
        control={control}
        name={'userName'}
        placeholder="Ingresa tu usuario/correo electrónico"
      />
      <FormInput
        control={control}
        name={'password'}
        placeholder='password'
        secureTextEntry
      />
     
      <TouchableOpacity
        style={styles.buttons}
        onPress={handleSubmit(handleLogin)}
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
      {/* {loading && <LoadingScreen />} */}
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