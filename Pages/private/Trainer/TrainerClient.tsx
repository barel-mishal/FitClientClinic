import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import ClientView from "../../../Components/ClientView";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerClient'>;

const TrainerClient: React.FC<Props> = ({ navigation, route: { params: {id}} }) => {
    const auth = useAuth();
    if (!auth.user || auth.data.role !== "trainer") return <View></View>;
    const c = auth.data.clients.find((c) => c.userId! === id);
    
    return <ClientView client={c} />;
}

export default TrainerClient;


