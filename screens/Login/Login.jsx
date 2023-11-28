import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { showMessage, hideMessage } from "react-native-flash-message";
import { TextInput } from 'react-native-paper'
import { Button } from 'react-native-paper';
import { authenticateUser } from '../../auth/auth'

const Login = ({ navigation }) => {
    const [users, setUsers] = useState([])
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [eyeIsEnabled, setEyeIsEnabled] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const response = await AsyncStorage.getItem("systemUsersCredentials")
            const students = response ? JSON.parse(response) : []
            if (students.length > 0) {
                setUsers(students)
            } else {
                const data = [
                    { Name: "Cardoso", Password: "semsenha", LoginPermission: "Admin" },
                    { Name: "Pedro", Password: 1234, LoginPermission: "User" },
                    { Name: "Joao", Password: 4422, LoginPermission: "User" },
                    { Name: "Matheus", Password: 2244, LoginPermission: "User" }
                ]
                setUsers(data)
                await AsyncStorage.setItem("systemUsersCredentials", JSON.stringify(data));
            }
        }
        getData()
    }, [])


    const getLogin = () => {
        authenticateUser("Admin")
        navigation.navigate("StackRoutes", { screen: "GaragesStack" })
      /*   const userTrue = users.find((user) => user.Name == login & user.Password == password)
        if (userTrue) {
            authenticateUser(userTrue["LoginPermission"])
            navigation.navigate("StackRoutes", { screen: "GaragesStack" })
            setLogin("")
            setPassword("")
        } else {
            {
                showMessage({
                    message: "Credenciais incorretas",
                    description: "Por favor, verifique-as e tente novamente.",
                    type: "danger",
                });
            }
        } */

    }

    return (
        <View style={styles.Container}>
            <Image style={styles.Logo} source={require("../../assets/PEDROCAR2.webp")} />
            <TextInput
                label={"Login"}
                placeholder={"Digite seu Login"}
                value={login}
                onChangeText={(text) => setLogin(text)}
                style={styles.TextInputStyle}
                theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />
            <TextInput
                label={"Senha"}
                placeholder={"Digite sua senha"}
                secureTextEntry={eyeIsEnabled}
                textContentType='password'
                right={<TextInput.Icon icon="eye" style={styles.TextInputStyleEye} onPress={() => setEyeIsEnabled(!eyeIsEnabled)} />}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.TextInputStyle}
                theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />

            <Button mode={"contained"} style={styles.ButtonStyle} onPress={() => getLogin()}>
                Logar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextInputStyle: {
        width: "80%",
        padding: 3,
        marginBottom: 30,
        backgroundColor: '#FFF',
    },

    TextInputStyleEye: {
        marginTop: 14
    },

    ButtonStyle: {
        width: "80%",
        padding: 3,
        backgroundColor: "#003566"
    },

    Logo: {
        width: 270,
        height: 200,
        marginBottom: 30,
        marginTop: 10
    }
});

export default Login