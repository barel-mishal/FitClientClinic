import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { RootStackParamList } from "../../../App";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import TrainerProgramCard from "../../../Components/TrainerProgramCard";
import { FitnessProgram, createRandomId } from "../../../types";


type Props = NativeStackScreenProps<RootStackParamList, 'TrainerPrograms'>;

export const newProgram = (): FitnessProgram[] => {
    const program1: FitnessProgram = {
        id: createRandomId(),
        name: "Total Body Workout",
        duration: '60m', // assuming total duration in minutes
        trainerId: "1",
        description: "This is a total body workout program designed to cover all major muscle groups.",
        exercises: [
            {
                id: "1",
                name: "Warm-up Jog",
                description: "A light jog to warm up the body.",
                sets: "1",
                estimatedDuration: `${10}m`, // in minutes
                reps: [{
                    repetitionType: "time",
                    duration: "600s", // in seconds
                }],
                imgUrl: "https://example.com/warmup-jog.png",
                urlExample: "https://example.com/warmup-jog-example.mp4",
            },
            {
                id: "2",
                name: "Push-ups",
                description: "Standard push-ups to work the chest, shoulders, and triceps.",
                sets: "3",
                estimatedDuration: "5m",
                reps: [{
                    repetitionType: "reps",
                    numberOfReps: 15,
                    repDuration: "2s", // assuming 2 seconds per rep
                }],
                imgUrl: "https://example.com/push-ups.png",
                urlExample: "https://example.com/push-ups-example.mp4",
            },            
            {
                id: "3",
                name: "Squats",
                description: "Bodyweight squats to target the lower body, particularly the quadriceps, hamstrings, and glutes.",
                sets: "3",
                estimatedDuration: "5m", // in minutes
                reps: [
                    {
                        repetitionType: "reps",
                        numberOfReps: 20,
                        repDuration: "2s", // assuming 2 seconds per rep
                    }
                ],
                imgUrl: "https://example.com/squats.png",
                urlExample: "https://example.com/squats-example.mp4",
            },
            {
                id: "4",
                name: "Plank",
                description: "Plank exercise to strengthen the core, including the abdominals and lower back.",
                sets: "3",
                estimatedDuration: "5m", // total duration for all sets in minutes
                reps: [
                    {
                        repetitionType: "time",
                        duration: "60s", // holding the plank for 60 seconds
                    }
                ],
                imgUrl: "https://example.com/plank.png",
                urlExample: "https://example.com/plank-example.mp4",
            },
            {
                id: "5",
                name: "Lunges",
                description: "Forward lunges to work the legs and improve balance.",
                sets: "3",
                estimatedDuration: "5m", // in minutes
                reps: [
                    {
                        repetitionType: "reps",
                        numberOfReps: 12, // per leg
                        repDuration: "2s", // assuming 2 seconds per rep
                    }
                ],
                imgUrl: "https://example.com/lunges.png",
                urlExample: "https://example.com/lunges-example.mp4",
            },
        ],
    };
    
    return [program1]
} 

const TrainerPrograms: React.FC<Props> = ({ navigation }) => {
    const auth = useAuth()
    if (!auth.user) return <View></View>
    
    const [programs, setPrograms] = useState<FitnessProgram[]>([
        {
            id: "1",
            name: "Program 1",
            duration: "30m",
            trainerId: "1",
            description: "This is program 1",
            exercises: []
        }]);

    return (
        <View>
            <ScrollView> 
                <View style={styles.container}>
                <TouchableOpacity onPress={() => {setPrograms(newProgram())}} style={{display: "flex", width: "100%" , flexDirection: "row", gap: 4, justifyContent: "center", alignItems: "center", padding: 7, marginTop: 14, borderRadius: 20, backgroundColor: "#7DD3FC", opacity: 50, }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#082F49" }}>Add Program</Text>
                    <Ionicons name="add-circle" size={24} color="#082F49" />
                </TouchableOpacity>
                {programs.map((m, index) => {
                    const program = {...m, trainerName: firstCharUpperCase(auth?.data?.name)}
                    return <TrainerProgramCard key={index} program={program} navigation={navigation} />
                })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 8,
    },
});

export const firstCharUpperCase = (str: string | undefined) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default TrainerPrograms;