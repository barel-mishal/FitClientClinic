import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {  } from "react";

import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import UserProgarmStart from "../../../Components/UserProgramStart";
import { View } from "react-native";

export type PropsClientWorkout = NativeStackScreenProps<RootStackParamList, 'ClientWorkout'>;

const ClientWorkout: React.FC<PropsClientWorkout> = ({navigation, route: {params: {programId, trainerId}}}) => {
    const u = useAuth();
    if (!u.user) return <View></View>;
    return <UserProgarmStart programId={programId} trainerId={trainerId} userId={u.user.uid} navigation={navigation} />;
}





export default ClientWorkout;


