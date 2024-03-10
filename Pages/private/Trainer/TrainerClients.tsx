import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../../../App";


type Props = NativeStackScreenProps<RootStackParamList, 'TrainerClients'>;

const TrainerHome: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>TrainerClients</Text>
            <Button title="Clients" onPress={() => navigation.navigate('TrainerClients')} />
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