import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
    const { profile } = userSchema;


    return (
        <View style={styles.container}>
            <Text>HomeClient {profile.name}</Text>
            <TouchableOpacity onPress={databaseMethods.logout}>
                <Text>Log Out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('ClientProperties')}>
                <Text>Client Properties</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeClient;