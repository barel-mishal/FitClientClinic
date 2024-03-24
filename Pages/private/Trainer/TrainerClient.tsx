import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import ClientView from "../../../Components/ClientView";
import ViewWorkoutsComp from "../../../Components/ViewWorkoutsComp";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerClient'>;

const TrainerClient: React.FC<Props> = ({ navigation, route: { params: {id}} }) => {
    const auth = useAuth();
    if (!auth.user || auth.data.role !== "trainer") return <View></View>;

    const c = auth.data.clients.find((c) => c.userId! === id);
    if (!c) return <View></View>;
    return <ScrollView>
    <ClientView client={c} />
        <ViewWorkoutsComp id={c?.userId!} />
    </ScrollView>;
}

export default TrainerClient;


