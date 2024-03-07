import React, { useEffect, useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("barel@mish.com");
    const [password, setPassword] = useState<string>("123456");
    useEffect(() => {
        console.log(email, password)
    }) 
    return (
        <View>
            <Text> Login </Text>
            <TextInput value={email} onChangeText={(t) => setEmail(t)} />
            <TextInput value={password} onChangeText={(t) => setPassword(t)} />
            <TouchableOpacity onPress={() => console.log(email + password)}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login
