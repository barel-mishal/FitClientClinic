import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";

const HomeClient = () => {
    return (
        <View style={styles.container}>
            <Text>HomeClient</Text>
            <TouchableOpacity onPress={async () => {
                await auth()?.signOut()
            }}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeClient;