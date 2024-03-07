import React from "react";

import { View, Text, StyleSheet } from "react-native";

const HomeClient = () => {
    return (
        <View style={styles.container}>
            <Text>HomeClient</Text>
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