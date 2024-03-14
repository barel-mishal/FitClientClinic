import React, { useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import databaseMethods from "../../services/databaseMethods";
import { set } from "valibot";

const init = {
    trainer: {
        email: "barel.trianer@mail.com",
        password: "Google",
    },
    client: {
        email: "mishal.barel@mail.com",
        password: "google",
    }
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string | undefined>(undefined);
    const login = async () => setMessage(await databaseMethods.login(email, password))
    return (
        <View>
            <Text>Login</Text>
            <TextInput value={email} onChangeText={(t) => setEmail(t)} />
            <TextInput secureTextEntry value={password} onChangeText={(t) => setPassword(t)} />
            <Text style={styles.message}>{message}</Text>
            
            <TouchableOpacity onPress={async () => setMessage(await databaseMethods.login(email, password))}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
                setEmail(init.trainer.email);
                setPassword(init.trainer.password);
            } }>
                <Text>Trainer Example</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
                setEmail(init.client.email);
                setPassword(init.client.password);
            } }>
                <Text>Client Example</Text>
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
