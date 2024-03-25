import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { RootStackParamList } from "../../../App";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import TrainerClientCard from "../../../Components/TrainerClientCard";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerClients'>;


const TrainerClients: React.FC<Props> = ({ navigation }) => {
    const auth = useAuth()
    if (!auth.user || auth.data?.role !== "trainer") return <View></View>
    return (
        <View style={styles.container}>
            <ScrollView> 
                <View style={styles?.container}>
                <View style={{display: "flex" , flexDirection: "column", gap: 4, padding: 12, marginTop: 14, borderRadius: 20, backgroundColor: "#7DD3FC",  }}>
                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#082F49" }}>Search Client</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, }}>
                        <TextInput style={{ display: "flex", padding: 12, borderRadius: 10, backgroundColor: "#f0f9ff", color: "#082F49", width: "100%" }} placeholder="Search Client" />
                        <Ionicons name="search" size={24} color="#082F49" style={{position: "absolute", right: 5}} />
                    </View>
                </View>
                    {auth.data.clients?.map((m, index) => {
                        return <TrainerClientCard key={index} client={m} navigation={navigation} />
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
        backgroundColor: "#f0f9ff",
        gap: 12,
        padding: 6
    },
});

export default TrainerClients;





