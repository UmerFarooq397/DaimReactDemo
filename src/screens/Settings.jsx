import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
import SettingsItem from '../compenents/SettingsItem';
import ToolBar from '../compenents/ToolBar';
import { SETTINGS } from '../data/Data';


export default function SettingsScreen(props) {
  
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
            <Image style={style.profileImage} source={require('../resources/images/Edit.png')}/>
            <View style={style.editorConatiner}>
                <Text style={style.editLable}>Editar</Text>
            </View>
            
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
    resizeMode: 'contain'
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
