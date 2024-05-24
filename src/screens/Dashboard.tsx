import React from 'react';
import { StyleSheet, Dimensions, View, Image, FlatList, Text, Alert, Pressable, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GridItem from '../compenents/GridItem';
import { CATEGORIES } from '../data/Data';

const DashboardScreen = (props) => {
    return (
        <SafeAreaView style={styles.viewConatiner}>
            <View style={styles.toolbarContainer}>
              <View style={styles.daimlogoContainer}>
                <Image style={styles.logoImage} source= {require('./../resources/images/dashboard_logo.png')}/>
              </View>
              
              <Pressable style={styles.logoutButton} onPress={() => {
                 Alert.alert('Logout', 'Are you sure you want to logout?', [
                  {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'Yes', onPress: () => {
                    console.log("I am here in on Press");
                    storeData('')
                    props.navigation.goBack()
                  } },
                ])
              }}>
                <Image style={styles.logoutImage} source={require('./../resources/images/logout_new.png')}></Image>
              </Pressable>
            </View>
            <View style={styles.userContainer}>
                <View style={styles.userDetailContainer}>
                  <View style= {styles.userDetailTextContainer}>
                    <Text style={styles.helloText}>¡Hola Umer!</Text>
                    <Text style={styles.dateText}>Uitimo ingreso: 22/05/2024 09:39</Text>
                    <Text style={styles.amountText}>Monto Disponible</Text>
                  </View>
                  <View style={styles.userDetailBalanceContainer}>
                    <Pressable style={{alignItems: 'center'}} onPress= {() => {
                      Alert.alert('Card View clicked');
                    }}>
                      <Image source= {require('./../resources/images/card_icon.png')} style={styles.cardImage}/>
                      <Text style={styles.dateText}>Agregar cuenta</Text>
                    </Pressable>
                      
                      <Text style={styles.amountText}>$20,000</Text>
                  </View>
                  
                </View>
            </View>

            <FlatList
                style={styles.flatList}
                data={CATEGORIES}
                numColumns={3}
                keyExtractor={(item) => item.id}
                renderItem={({ index, item }) => (
                    <GridItem title={item.name} icon={item.icon} />
                )} />
             <View style={styles.saleViewContainer}>
                <View style={styles.saleView}>
                    <Text style={styles.saleText}>SALE OFF 20%</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('accessToken', value);
  } catch (e) {
    // saving error
  }
};

const styles = StyleSheet.create({
    viewConatiner: {
      flex: 1,
    },
    logoutButton: {
      alignItems: 'flex-end',
      marginRight: 10,
      marginTop: 20,
      flex: 0.5,
    },
    daimlogoContainer: {
      alignItems: 'flex-start',
      marginLeft: 10,
      marginTop: 20,
      flex: 0.5
    },
    logoutImage: {
      resizeMode: 'contain',
      height: 20,
      width: 20
    },
    logoImage: {
      resizeMode: 'contain',
      height: 20,
      width: 70
    },
    toolbarContainer: {
      flex: 1,
      backgroundColor: '#0F87CA',
      postion: 'fixed',
      flexDirection: 'row'
    },
    userContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginTop: -50
    },
    cardImage: {
      resizeMode: 'contain',
      height: 30,
      width: 30,
      marginTop: -18
    },
    userDetailContainer: {
      flex: 1,
      height: '80%',
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 20,
      shadowOpacity: 0.25,
      flexDirection: 'row'
    },
    userDetailTextContainer: {
      flex: 0.6,
    },
    userDetailBalanceContainer: {
      flex: 0.4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    helloText: {
      fontSize: 14,
      fontWeight: 'normal',
      color: 'black',
      marginTop: 16,
      marginLeft: 16 
    },
    dateText: {
      fontSize: 12,
      marginTop: 5,
      marginLeft: 16 
    },
    amountText: {
      fontSize: 17,
      marginTop: 24,
      color: 'black',
      fontWeight: '500',
      marginLeft: 16 
    },

    flatList: {
      padding: 10
    },
    backgroundImage: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      opacity: 0.4
    },
    saleViewContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginTop: -20
    },
    saleView: {
      height: 60,
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 10,
      shadowOpacity: 0.25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 1,
      elevation: 1,
      padding: 4,
    },
    saleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#73788d',
      borderRadius: 10,
      hight: '100%',
      width: '100%',
      padding: 12
    }
  });
export default DashboardScreen;