import React from "react";
import { Pressable, StyleSheet, Text, View, Platform, Image, Alert } from "react-native";

const ToolBar = (props) => {
    return (
        <View style={style.toolbarContainer}>
              <View style={style.toolBar}>
                <Text style={style.toolBarTitle}>{props.title}</Text>
              </View>
        </View>
    )
}


export default ToolBar;

const style = StyleSheet.create({
    toolBarTitle: {
        fontSize: 16,
        color: 'white'
    },
    toolBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbarContainer: {
        flex: 1,
        backgroundColor: '#0F87CA',
        postion: 'fixed',
        flexDirection: 'row'
    }
})