import React from "react";

import { View, Text, StyleSheet } from "react-native";

const TrainerHome = () => {
    return (
        <View style={styles.container}>
            <Text>TrainerHome</Text>
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

export default TrainerHome;