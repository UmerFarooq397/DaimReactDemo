import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';


export default function AccountsScreen(props) {
    return (
        <View style={{flex: 1, backgroundColor: '#4DA'}}>
            <Text style={{fontWeight:'bold', alignItems: 'center'}}>Hi this is the text of Accounts screen</Text>
        </View>
    );
}