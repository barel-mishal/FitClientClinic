import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../../App";
import { Entypo } from '@expo/vector-icons';
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import databaseMethods from "../../../services/databaseMethods";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerProgram'>;

const TrainerProgram: React.FC<Props> = ({ navigation, route: { params: {id}} }) => {
    const auth = useAuth();
    if (!auth.user) return <View></View>;
    const program = databaseMethods.getTrainerProgram(auth.user.uid, id)
    console.log(program)
    
    return (
        <View>
            <View>
                <Text>Program {id}</Text>
            </View>
            {/* <View style={styles.programCard}>
                <View style={styles.headerRow}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.programName}>{program.name}</Text>
                        <Text style={styles.trainerName}>Trainer: {program.trainerName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate(program.id)}>
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
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    programCard: {
        flexDirection: "column",
        display: "flex",
        backgroundColor: "#7DD3FC",
        opacity: 0.5, // Changed from 50 to 0.5 for correct opacity value
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

export default TrainerProgram;


