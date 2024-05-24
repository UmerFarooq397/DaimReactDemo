import React from "react";
import { Pressable, StyleSheet, Text, View, Platform, Image, Alert } from "react-native";

const GridItem = (props) => {
    return (
        <View style={style.gridItem}>
            <Pressable
                style={style.button}
                android_ripple={{ color: '#ccc' }}
                onPress={() => {
                    Alert.alert(props.title);
                }}
            >
                <View style={[style.innerContainer]}>
                    <Image source={props.icon}
                        style={style.image}
                    />
                    <Text style={style.textStyling}>{props.title}</Text>
                </View>
            </Pressable>
        </View>
    )
}


export default GridItem;

const style = StyleSheet.create({
    textStyling: {
        fontSize: 10,
        color: 'black'
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'

    },
    image: {
        width: '80%',
        height: '50%',
        resizeMode: 'contain',
        margin: 10
    },
    button: {
        flex: 1
    },
    gridItem: {
        flex: 1,
        margin: 5,
        height: 85,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 1,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible'
    }
})