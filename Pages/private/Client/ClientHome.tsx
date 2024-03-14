import React, {  } from "react";

import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import databaseMethods from "../../../services/databaseMethods";
import { useAuth } from "../../../Components/ContextComopnents/AuthContext";
import { isUserLoggedIn } from "../../../types";

type Props = NativeStackScreenProps<RootStackParamList, 'ClientHome'>;

const HomeClient: React.FC<Props> = ({ navigation }) => {
    const userSchema = useAuth();

    if (!isUserLoggedIn(userSchema)) {
        return <Text>User is not logged in</Text>;
    }

    // From this point on, TypeScript knows that userSchema is of type { user: User; profile: Profile }
    const { data } = userSchema;


    return (
            <View style={{...styles.container, padding: 16}}>
                    <Text style={styles.title}>Wolcome {data?.name}</Text>
                
                <CardWrapper>
                    <TouchableOpacity onPress={() => navigation.navigate('ClientProperties')}>
                        <Text style={styles.title2}>Client Properties</Text>
                    </TouchableOpacity>
                </CardWrapper>
                
                <CardWrapper>
                    <TouchableOpacity onPress={() => navigation.navigate('ClientWorkouts')}>
                        <Text style={styles.title2}>Client Workouts</Text>
                    </TouchableOpacity>
                </CardWrapper>

                <CardWrapper styleOption={{justifyContent: "space-evenly"}}>
                    <TouchableOpacity onPress={databaseMethods.logout}>
                        <Text style={styles.title2}>Log Out</Text>
                    </TouchableOpacity>
                </CardWrapper>
            </View>
    );
}

export const CardWrapper = (props: { children: React.ReactNode, styleOption?: ViewStyle}) => {
    return (
        <View style={{...styles.cardWrapper, ...props.styleOption}}>
            {props.children}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 16,
        backgroundColor: "#fffff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#082F49",
    },
    title2: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#082F49",
    },
    cardWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        padding: 16,
        borderRadius: 8,
        backgroundColor: "rgba(125, 211, 252, 0.5)",
    },
});

export default HomeClient;