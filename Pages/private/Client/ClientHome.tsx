import React, {  } from "react";

import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import CardWrapper from "../../../Components/CardWrap";
import styles from "../Both/StyleHome";
import Stack from "../../../Components/Stack";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientHome'>;

const HomeClient: React.FC<Props> = ({ navigation }) => {
    const userSchema = useAuth();

    if (!userSchema.user || userSchema.data.role !== "client") {
        navigation.navigate('GetStarted');
        return <Text>User is not logged in</Text>;
    }

    const { data } = userSchema;

    const isWorkOutDisabled = !data?.currentProgramId || !data?.trainerId;
    const activeCardStyle = isWorkOutDisabled ? "#fed7aa" : "#fdba74";
    const activeCardTextStyle = isWorkOutDisabled ? "#fb923c" : "#431407";


    return (
        <>
        <ScrollView>
                <View style={{backgroundColor: "#f0f9ff"}}>
                    <Stack>
                        <Text style={{...styles.title}}>Welcome {data?.name}</Text>
                        <Text style={{fontSize: 20, color: "#0891b2", fontWeight: "bold"}}>Where focus goes energy flows</Text>
                    </Stack>
                    <Stack styleOption={{gap: 32}}>
                        <CardWrapper styleOption={{backgroundColor: activeCardStyle, shadowColor: "#431407"}}>
                            <TouchableOpacity disabled={isWorkOutDisabled} style={styles.gap2} onPress={() => (!data?.currentProgramId || !data?.trainerId) ? null : navigation.navigate('ClientWorkout', {programId: data.currentProgramId, trainerId: data.trainerId}) }>
                                <Text style={{...styles.title2, color: activeCardTextStyle}}>START A WORKOUT</Text>
                                <Text style={{color: "#431407"}}>
                                    { "Start a new workout or continue an existing one"}
                                </Text>
                            </TouchableOpacity>
                        </CardWrapper>
                        
                        <CardWrapper>
                            <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('ClientWorkouts')}>
                                <Text style={styles.title2}>Client Workouts</Text>
                                <Text>
                                    View your workouts and create new ones as well as view your progress
                                </Text>
                            </TouchableOpacity>
                        </CardWrapper>

                        <CardWrapper>
                            <TouchableOpacity style={styles.gap2} onPress={() => navigation.navigate('ClientProperties')}>
                                <Text style={styles.title2}>Client Properties</Text>
                                <Text>
                                    Update your personal information
                                </Text>
                            </TouchableOpacity>
                        </CardWrapper>

                        <CardWrapper styleOption={{justifyContent: "space-evenly", backgroundColor: "transparent"}}>
                            <TouchableOpacity style={styles.gap2} onPress={() => {
                                userSchema.signOut();
                                }}>
                                <Text style={styles.alertText}>Log Out</Text>
                            </TouchableOpacity>
                        </CardWrapper>
                    </Stack>
                </View>

            
        </ScrollView>
        </>
    );
}

// background: rgb(37,99,235);
// background: linear-gradient(45deg, rgba(37,99,235,1) 5%, rgba(234,88,12,1) 65%, rgba(21,128,61,1) 100%);


export default HomeClient;