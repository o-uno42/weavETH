import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../app/styles.js";
// import { Dimensions } from "react-native";
export default function ButtonsHome() {
    const navigation = useNavigation();
    return (
    <View style={styles.containerForButtonsHome}>
        <TouchableOpacity onPress={() => navigation.navigate('ConnectWalletPage')}>
            <View style={[styles.imageButtonWrapper, { marginRight: 20 }]}>
            <Image
                source={require('./../assets/sprites/button.png')}
                style={styles.imageButtonHome}
                resizeMode="contain"
            />
            <Text style={styles.imageButtonText}>Start</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <View style={styles.imageButtonWrapper}>
            <Image
                source={require('./../assets/sprites/button.png')}
                style={[
                styles.imageButtonHome,
                { transform: [{ scaleX: -1 }] }
                ]}
                resizeMode="contain"
            />
            <Text style={styles.imageButtonText}>About</Text>
            </View>
        </TouchableOpacity>
    </View>
);
}