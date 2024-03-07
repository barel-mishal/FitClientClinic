import React from "react";

import { View, Text, StyleSheet } from "react-native";

const ClientWorkouts = () => {
    return (
        <View style={styles.container}>
            <Text>ClientWorkouts</Text>
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

export default ClientWorkouts;