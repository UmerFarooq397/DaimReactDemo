import React from "react";
import { Pressable, StyleSheet, Text, View, Platform, Image, Alert } from "react-native";

const SettingsItem = (props) => {
    return (
        <View style={style.settingsContainer}>
            <View style={style.innerContainer}>
                <Image source={props.icon} style={style.image} />
                <View style={style.textContainer}>
                    <Text style={style.textStyling}>{props.title}</Text>
                </View>
                {props.showArrow && (
                    <View style={style.arrowContainer}>
                        <Image source={require('../resources/images/right-arrow.png')} />
                    </View>
                )}
                
            </View>
        </View>
    )
}


export default SettingsItem;

const style = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        padding: 4,
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'center',
        margin: 10
    },
    arrowContainer: {
        justifyContent: 'center',
        marginRight: 16
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    textStyling: {
        fontSize: 14,
        color: 'black',
        justifyContent: 'center',
        marginLeft: 16
    },
    innerContainer: {
        flexDirection: 'row'
    }
})