import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";

import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import UserProgarmStart from "../../../Components/UserProgramStart";
import { View } from "react-native";

export type PropsClientWorkout = NativeStackScreenProps<RootStackParamList, 'ClientWorkout'>;

const ClientWorkout: React.FC<PropsClientWorkout> = ({navigation, route: {params}}) => {
    const { programId, trainerId } = params as { programId: string, trainerId: string };
    const u = useAuth();
    if (!u.user) return <View></View>;
    return <UserProgarmStart programId={programId} trainerId={trainerId} userId={u.user.uid} navigation={navigation} rediract="ClientWorkout" />;
}





export default ClientWorkout;


