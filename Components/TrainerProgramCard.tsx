import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "./ContextComopnents/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { FitnessProgramOutput } from "../types";
import databaseMethods from "../services/databaseMethods";
import { Program } from "../Pages/private/Trainer/TrainerPrograms";

type Props = {
    program: Required<FitnessProgramOutput> & { trainerName: string };
    navigation: NativeStackNavigationProp<RootStackParamList, "TrainerPrograms" | "TrainerClients", undefined>;
    setPrograms: React.Dispatch<React.SetStateAction<Program[]>>
}

const TrainerProgramCard: React.FC<Props> = ({ program, navigation, setPrograms }) => {
    const auth = useAuth();
    if (!auth?.user) return <View></View>;
    const [visible, setVisible] = React.useState(false);
    const options = [
        { label: "Edit", value: "edit" },
        { label: "Delete", value: "delete" },
    ];

    const handleSelect = (option: { label: string, value: string }) => {
        setVisible(false);
        if (option.value === "edit") {
            navigation.navigate("TrainerCreateProgram", { programId: program.id });
        } else if (option.value === "delete") {
            databaseMethods.deleteTrainerProgram(program.id);
            setPrograms((prev) => prev.filter((p) => p.id !== program.id));
        }
    };
    
    return (
        <TouchableOpacity onPress={() => { navigation.navigate("TrainerProgram", {id: program.id})} }>
            <View style={styles.programCard}>
                <View style={styles.headerRow}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.programName}>{program.name}</Text>
                        <Text style={styles.trainerName}>Trainer: {program.trainerName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {setVisible(true)}}>
                        <Entypo name="dots-three-horizontal" size={24} color="#082F49" />
                    </TouchableOpacity>
                    <Modal visible={visible} transparent={true} animationType="slide">
                        <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
                        <View style={styles.modalContent}>
                            <ScrollView>
                            {options.map((option, index) => (
                                <TouchableOpacity key={index} onPress={() => handleSelect(option)} style={styles.option}>
                                <Text>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                            </ScrollView>
                        </View>
                        </TouchableOpacity>
                    </Modal>
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
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        width: "80%",
    },
    option: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default TrainerProgramCard;


