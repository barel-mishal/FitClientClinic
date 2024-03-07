import React, { useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import databaseMethods from "../../services/databaseMethods";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("mishal.barel@mail.com");
    const [password, setPassword] = useState<string>("google");
    const [message, setMessage] = useState<string | undefined>(undefined);
    const login = async () => setMessage(await databaseMethods.login(email, password))
    return (
        <View>
            <Text>Login</Text>
            <TextInput value={email} onChangeText={(t) => setEmail(t)} />
            <TextInput value={password} onChangeText={(t) => setPassword(t)} />
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity onPress={async () => setMessage(await databaseMethods.login(email, password))}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export const styles = StyleSheet.create({
    message: {
        color: "red",
        height: 60,
    }
})

export default Login
