import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import UserProgarmStart from "../../../Components/UserProgramStart";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerProgram'>;

const TrainerProgram: React.FC<Props> = ({ route: { params: { id }}, navigation }) => {
    const auth = useAuth();
    if (!auth.user || auth.data.role !== "trainer") return <View></View>;
    const [userId, setUserId] = React.useState<string>("");
    const p = auth.data.programs.filter((p) => p.id! === id);
    return <>
    {userId === "" 
    ? <View><Text>choose a user</Text></View> 
    : <UserProgarmStart 
        navigation={navigation} 
        programId={id} 
        trainerId={auth.user.uid} 
        userId={userId} 
        key={userId + auth.user.uid}
        
    />}
    </>
    // return <RenderProgram program={p[0] as FitnessProgramOutput} />;
}



export default TrainerProgram;


