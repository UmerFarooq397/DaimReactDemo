import { StyleSheet, View, Image } from 'react-native';
import { useEffect } from 'react';

export default function SplashScreen(props) {

    useEffect(() => {
        const interval = setInterval(() => {
            // props.navigation.navigate("LoginScreen")
            props.navigation.navigate("HomeScreen")

         }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <View>
            <Image style={styles.splashImage} source={require('./../resources/images/splash.png')}/>
        </View>
    );
}
const styles = StyleSheet.create({
    splashImage: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
    }
})