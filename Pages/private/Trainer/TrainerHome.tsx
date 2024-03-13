import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../../../App";


type Props = NativeStackScreenProps<RootStackParamList, 'TrainerHome'>;

const TrainerHome: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>TrainerHome</Text>
            <Button title="Appointments" onPress={() => navigation.navigate('TrainerAppointments')} />
            <Button title="Clients" onPress={() => navigation.navigate('TrainerClients')} />
            <Button title="Programs" onPress={() => navigation.navigate('TrainerPrograms')} />
            <Button title="Create Program" onPress={() => navigation.navigate('TrainerCreateProgram')} />
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