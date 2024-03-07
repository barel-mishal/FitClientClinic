import React from "react";

import { View, Text, StyleSheet } from "react-native";

const TrainerAppointment = () => {
    return (
        <View style={styles.container}>
            <Text>TrainerAppointment</Text>
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

export default TrainerAppointment;