import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { RootStackParamList } from "../../../App";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import TrainerProgramCard from "../../../Components/TrainerProgramCard";
import { FitnessProgramOutput } from "../../../types";
import databaseMethods, { COLLECTIONS } from "../../../services/databaseMethods";
import { useQuery } from "react-query";


type Props = NativeStackScreenProps<RootStackParamList, 'TrainerPrograms'>;
export type Program = Required<FitnessProgramOutput> & { trainerName: string }

const TrainerPrograms: React.FC<Props> = ({ navigation }) => {
    const auth = useAuth()
    if (!auth.user || auth.data?.role !== "trainer") return <View></View>
    const { data: ps, error, isLoading } = useQuery<Program[]>(
        [COLLECTIONS.FITNESS_PROGRAMS, COLLECTIONS.FITNESS_PROGRAMS], 
        async () => (await databaseMethods.getAllTrainerPrograms(auth.user.uid)).map((p) => ({...p, trainerName: firstCharUpperCase(auth?.data?.name)})),
        { refetchOnWindowFocus: true, refetchOnMount: true, cacheTime: 0, staleTime: 0 }
    );
    console.log("ps", ps)
    const [programs, setPrograms] = useState<Program[]>(ps || []);

    if (isLoading) return <View></View>

    if (error && error instanceof Error) return <View><Text>An error occurred: {error.message}</Text></View>;

    return (
        <View>
            <ScrollView> 
                <View style={styles?.container}>
                <TouchableOpacity onPress={() => {navigation.navigate("TrainerCreateProgram")}} style={{display: "flex", width: "100%" , flexDirection: "row", gap: 4, justifyContent: "center", alignItems: "center", padding: 7, marginTop: 14, borderRadius: 20, backgroundColor: "#7DD3FC", opacity: 50, }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#082F49" }}>Add Program</Text>
                    <Ionicons name="add-circle" size={24} color="#082F49" />
                </TouchableOpacity>
                {programs?.map((m, index) => {
                    const program = {...m, trainerName: firstCharUpperCase(auth?.data?.name)}
                    return <TrainerProgramCard key={index} program={program} navigation={navigation} setPrograms={setPrograms} />
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