import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import UserProgarmStart, { } from "../../../Components/UserProgramStart";

type Props = NativeStackScreenProps<RootStackParamList, 'TrainerProgram', undefined>;

const TrainerProgram: React.FC<Props> = ({ route: { params: { id }}, navigation }) => {
    const auth = useAuth();
    if (!auth.user || auth.data.role !== "trainer") return <View></View>;
    const [userId, setUserId] = React.useState<string>("");
    const p = auth.data.programs.filter((p) => p.id! === id);
    return <>
    {userId === "" 
    ? <ScrollView><View style={{backgroundColor: "#f0f9ff", display: "flex", gap: 12, padding: 8, height: "100%"}}>
        <Text style={{color: "#0369a1", fontSize: 20, fontWeight: "700"}}>Choose a user</Text>
        {auth.data.clients.map((c, index) => {
            return <Pressable 
                style={{backgroundColor: "#7DD3FC", padding: 16, borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center"}}
            key={index} onPress={() => setUserId(c.userId!)}>
                <Text style={{fontSize: 20, fontWeight: "600"}}>{c.name}</Text>
            </Pressable>
        })}
    </View></ScrollView>
    : <UserProgarmStart 
        navigate={() => navigation.navigate("TrainerClient", { id: userId } )} 
        programId={id} 
        trainerId={auth.user.uid} 
        userId={userId} 
        key={userId + auth.user.uid}
    />}
    </>
    // return <RenderProgram program={p[0] as FitnessProgramOutput} />;
}



export default TrainerProgram;


