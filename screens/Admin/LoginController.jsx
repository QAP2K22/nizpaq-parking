import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, IconButton, Text } from 'react-native-paper'

const LoginController = ({ navigation }) => {
  const [data, setData] = useState({})

  useFocusEffect(
    /*Da reload quando a tela está focada.*/
    React.useCallback(() => {
      getData()
    }, [])
  );

  const getData = async () => {
    const response = await AsyncStorage.getItem("systemUsersCredentials")
    const loginStatus = response ? JSON.parse(response) : []
    setData(loginStatus)
  }

  return (
    <View style={styles.Container}>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          <Card.Title
            title={item.Name}
            subtitle={`${item.LoginPermission == "User" ? "Funcionário" : item.LoginPermission}`}
            left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: '#FFC300' }} color={'#FFF'} icon={item.LoginPermission == "Admin" ? "account-supervisor" : "account-hard-hat"} />}
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => navigation.push("loginController-form", { action: "AlterItem", value: item })} />}
          />}
        keyExtractor={item => item.id}
      />

      <Button style={styles.ButtonStyle} labelStyle={{ color: "white" }} onPress={() => navigation.push("loginController-form", { action: "CreateItem" })}>Cadastrar usuário</Button>

    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  ButtonStyle: {
    backgroundColor: "#001d3d",
    borderColor: "transparent",
    marginEnd: 1,
    marginHorizontal: 5
  }

});

export default LoginController