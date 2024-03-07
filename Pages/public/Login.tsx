import React, { useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import databaseMethods from "../../services/databaseMethods";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("barel@mish.com");
    const [password, setPassword] = useState<string>("123456");
    return (
        <View>
            <Text> Login </Text>
            <TextInput value={email} onChangeText={(t) => setEmail(t)} />
            <TextInput value={password} onChangeText={(t) => setPassword(t)} />
            <TouchableOpacity onPress={() => databaseMethods.login(email, password)}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login
