import React from "react";

import { View, Text, StyleSheet } from "react-native";

const WorkoutSummary = () => {
    return (
        <View style={styles.container}>
            <Text>WorkoutSummary</Text>
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

export default WorkoutSummary;