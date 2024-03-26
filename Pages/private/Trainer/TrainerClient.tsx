import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions, ScrollView, View, Text } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import ClientView from "../../../Components/ClientView";
import ViewWorkoutsComp from "../../../Components/ViewWorkoutsComp";
import { useQuery } from "react-query";
import databaseMethods from "../../../services/databaseMethods";
import { calcScore } from "../../../types";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerClient'>;

const TrainerClient: React.FC<Props> = ({ navigation, route: { params: {id}} }) => {
    const auth = useAuth();
    if (!auth.user || auth.data.role !== "trainer") return <View></View>;

    const c = auth.data.clients.find((c) => c.userId! === id);

    if (!c) return <View></View>;
    const { data: workouts, error, isLoading } = useQuery(
        ['workouts', id], 
        () => databaseMethods.getUserClientWorkouts(c?.userId!), 
        { refetchOnWindowFocus: true, refetchOnMount: true, cacheTime: 0, staleTime: 0 }
    );
    if (isLoading) return <View style={{padding: 16, display: "flex", gap: 24, backgroundColor: "#172554", height: Dimensions.get("window").height}}><Text>Loading...</Text></View>;
    if (error && error instanceof Error) return <View><Text>An error occurred: {error.message}</Text></View>;
    const avgScore = (workouts?.map(calcScore).reduce((a, b) => a + b, 0) ?? 0)  / (workouts?.length ?? 0);
    return <ScrollView style={{backgroundColor:"#f0f9ff"}}>
        <ClientView client={c} numberOfWorkout={workouts?.length ?? 0} avgScore={avgScore} />
        <Text style={{fontSize: 26, fontWeight: "900", marginLeft: 16, marginTop: 20, marginBottom: 5, color: "#0c4a6e"}}>Workouts</Text>
        <ViewWorkoutsComp workouts={workouts}  />
    </ScrollView>;
}

export default TrainerClient;


