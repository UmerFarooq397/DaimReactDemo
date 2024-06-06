import { View, FlatList, StyleSheet, Image, Text, Pressable, Alert } from 'react-native';
import SettingsItem from '../compenents/SettingsItem';
import ToolBar from '../compenents/ToolBar';
import { SETTINGS } from '../data/Data';
import { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LoadingScreen from './../compenents/LoadingScreen'; // Make sure to use the correct path
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function SettingsScreen(props) {
  const url = "https://croeminc-demoapi.sigmaprocess.net/api/services/app/User/ChangeProfilePicture"
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadProfilePic = async (photo) => {
    const value = await AsyncStorage.getItem('accessToken')
    console.log('Access Token:::: ', value);
    const fileUploadRequest = {
      fileBase64: photo,
    }    
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + value
      },
      body: JSON.stringify(
        fileUploadRequest
        )
    })
    .then((resp) => resp.json())
    .then((json) => {
      // setData(json)
      console.log(json)
      if(json.success == true) {
        Alert.alert("Profile Picture updated successfully.");
      }
      else {
        Alert.alert(json.error.message);
      }
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }

  const selectImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true
    };
    
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        // console.log(response.assets[0].base64);
        const source = { uri: response.assets[0].uri };
        // console.log(source);
        setPhoto(source);
        setLoading(true)
        uploadProfilePic(response.assets[0].base64)
        // Convert image to base64
        // RNFetchBlob.fs.readFile(response.uri, 'base64')
        //   .then((data) => {
        //     uploadProfilePic(data);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }
    });
  };
  const takePhoto = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else {
        const source = { uri: response.assets[0].uri };
        setPhoto(source);
      }
    });
  };
  return (
    <View style={style.viewContainer}>
      <View style={style.toolBarConatiner}>
        <ToolBar title="Administración"></ToolBar>
      </View>
      
      <View style={style.userContainer}>
        <View style={style.notificationContainer}>
            <View style={style.daimLogoConatiner}>
                <Image style={style.daimLogoImage} source={require('../resources/images/profile_logo.png')}/>
            </View>
            <View style={style.notificationIconContainer}>
                <Image style={style.notificationIcon} source={require('../resources/images/bell_icon.png')}/>
            </View>
        </View>

        <View style={style.profileImageContainer}>
          {photo ? (
              <Image style={style.profileImage} source={photo} />
          ) : (
              <Image style={style.profileImage} source={require('../resources/images/Edit.png')} />
          )}
          <Pressable style={style.editorConatiner}
            onPress={() => {
              selectImage()
            }}
          >
            <Text style={style.editLable}>Editar</Text>
          </Pressable>
            
        </View>
        <View style={style.userNameContainer}>
            <Text style={style.userNameText}>Umer Farooq</Text>
        </View>

        
      </View>
      <View style={style.flatListContainer}>
        <FlatList
            data={SETTINGS}
            renderItem={({item}) => <SettingsItem title={item.title} icon={item.icon} showArrow= {item.showArrow} />}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={item => item.id}
        />
      </View>
      {loading && <LoadingScreen />}
    </View>
  );
}

const renderSeparator = () => (
    <View style={style.separator} />
);
const style = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  notificationContainer: { 
    flex: 0.24, 
    flexDirection: 'row', 
    marginTop: 8
 },
 daimLogoConatiner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 16,
 },
 daimLogoImage: { 
    width: 100, 
    height: 50, 
    resizeMode: 'contain'
 },
 notificationIconContainer: { 
    backgroundColor: '#D3D3D3', 
    borderRadius: 20, 
    justifyContent: 'center', 
    marginRight: 16,
    padding: 12 
},
notificationIcon: {
    width: 15, 
    height: 15, 
    resizeMode: 'contain'
},
profileImageContainer: {
    flex: 0.4, 
    width: '40%', 
    position: 'relative', // Ensure the container is relative for absolute positioning to work inside
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row'
},
profileImage: {
    width: 50, 
    height: 50, 
    resizeMode: 'contain',
    borderRadius: 25
},
editorConatiner: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5, // Optional: Add some padding around the text
    borderRadius: 5, // Optional: Add some border radius
},
editLable: {
    color: 'blue',
},
userNameContainer: {
    flex: 0.3, 
    backgroundColor: 'white', 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row'
},
userNameText: {
    color: 'black'
},
  toolBarConatiner: {
    flex: 0.1,
  },
  flatListContainer: {
    flex: 0.7,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
  },
  userContainer: {
    alignItems: 'center',
    flex: 0.3,
    marginTop: -16,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
});
