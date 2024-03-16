import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "./ContextComopnents/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { FitnessProgramOutput } from "../types";

type Props = {
    program: Required<FitnessProgramOutput> & { trainerName: string };
    navigation: NativeStackNavigationProp<RootStackParamList, "TrainerPrograms", undefined>;
}

const TrainerProgramCard: React.FC<Props> = ({ program, navigation }) => {
    const auth = useAuth();
    if (!auth?.user) return <View></View>;
    
    return (
        <TouchableOpacity onPress={() => { navigation.navigate("TrainerProgram", {id: program.id})} }>
            <View style={styles.programCard}>
                <View style={styles.headerRow}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.programName}>{program.name}</Text>
                        <Text style={styles.trainerName}>Trainer: {program.trainerName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {console.log("menu")}}>
                        <Entypo name="dots-three-horizontal" size={24} color="#082F49" />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.descriptionRow}>
                        <Text style={styles.descriptionLabel}>Description:</Text>
                        <View style={styles.durationContainer}>
                            <Entypo name="time-slot" size={16} color="#082F49" />
                            <Text style={styles.duration}>~{program.duration}m</Text>
                        </View>
                    </View>
                    <Text style={styles.descriptionText}>{program.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    programCard: {
        flexDirection: "column",
        display: "flex",
        backgroundColor: "rgba(125, 211, 252, 0.5)",
        padding: 10,
        borderRadius: 20,
        minHeight: 150,
        paddingVertical: 16,
        gap: 24,
    },
    headerRow: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
    },
    titleContainer: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: 2,
    },
    programName: {
        fontSize: 30,
        fontWeight: "800",
        color: "#082F49",
    },
    trainerName: {
        fontSize: 16,
        fontWeight: "400",
        color: "#082F49",
    },
    descriptionRow: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: 4,
    },
    descriptionLabel: {
        fontSize: 16,
        fontWeight: "700",
        color: "#082F49",
    },
    durationContainer: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        alignItems: "center",
    },
    duration: {
        fontSize: 16,
        fontWeight: "500",
        color: "#082F49",
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#082F49",
    },
});

export default TrainerProgramCard;


