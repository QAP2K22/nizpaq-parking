import { Formik } from 'formik'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { showMessage, hideMessage } from "react-native-flash-message"
import * as yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginControllerForm = ({ navigation, route }) => {
  const [eyeIsEnabled, setEyeIsEnabled] = useState(true)
  const { action, value: iserValue } = route.params
  let defaultValues = { Name: '', Password: 0, LoginPermission: 'User' }

  if (iserValue) {
    defaultValues.Name = iserValue.Name,
      defaultValues.Password = iserValue.Password,
      defaultValues.LoginPermission = iserValue.LoginPermission
  }

  const loginValidationSchema = yup.object().shape({
    Name: yup
      .string()
      .required('Você precisa inserir um nome para a garagem.'),
  })

  const AddUser = async (values) => {
    const response = await AsyncStorage.getItem("systemUsersCredentials")
    const garageName = response ? JSON.parse(response) : []
    if (action !== "AlterItem") {
      const testValue = garageName.find((value) => value.Name == values.Name)
      if (!testValue) {
        garageName.push(values)
        await AsyncStorage.setItem("systemUsersCredentials", JSON.stringify(garageName));
        showMessage({
          message: "Cadastro sucessido",
          description: "Seu usuário foi cadastrado com sucesso.",
          type: "success",
        })
        navigation.goBack()

      } else {
        showMessage({
          message: "Usuário existente",
          description: "Por favor, cadastre um outro nome de usuário.",
          type: "danger",
        })
      }

    } else {
      if (iserValue) {
        const index = garageName.findIndex(object => {
          return object.Name == values.Name
        });

        garageName.splice(index, 1, values)

        await AsyncStorage.setItem("systemUsersCredentials", JSON.stringify(garageName))
        showMessage({
          message: "Usuário alterado",
          description: "Seu usuário foi alterado com sucesso.",
          type: "success",
        })
        navigation.goBack()
      }

    }
  }


  return (
    <View style={styles.container}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={defaultValues}
        onSubmit={values => AddUser(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <TextInput
              mode={"outlined"}
              name={"Name"}
              label={"Usuário"}
              placeholder={"Digite o nome do usuário"}
              onChangeText={handleChange('Name')}
              value={values.Name}
              error={errors.Name}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />
            <HelperText type="error" visible={errors.Name && touched.Name}>
              {errors.Name}
            </HelperText>

            <TextInput
              mode={"outlined"}
              name={"Password"}
              label={"Usuário"}
              placeholder={"Digite o nome do usuário"}
              secureTextEntry={eyeIsEnabled}
              onChangeText={handleChange('Password')}
              right={<TextInput.Icon icon="eye" style={styles.TextInputStyleEye} onPress={() => setEyeIsEnabled(!eyeIsEnabled)} />}
              value={values.Password}
              error={errors.Password}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />
            <HelperText type="error" visible={errors.Password && touched.Password}>
              {errors.Password}
            </HelperText>

            <TextInput
              mode={"outlined"}
              name={"LoginPermission"}
              value={values.LoginPermission}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}
              render={() => (
                <Picker
                  selectedValue={values.LoginPermission}
                  onValueChange={(itemValue, itemIndex) =>
                    handleChange('LoginPermission')(itemValue)
                  }
                  style={{ height: 54 }}
                >
                  <Picker.Item label="Admin" value="Admin" />
                  <Picker.Item label="Usuário" value="User" />
                </Picker>
              )}
            />
            <HelperText type="error" visible={errors.LoginPermission && touched.LoginPermission}>
              {errors.LoginPermission}
            </HelperText>

            <Button onPress={handleSubmit} mode={"contained"} style={styles.ButtonStyle}>{action == "AlterItem" || false ? "Editar" : "Cadastrar"}</Button>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  input: {
    width: "90%",
    backgroundColor: '#FFF',
  },

  ButtonStyle: {
    width: "80%",
    padding: 3,
    backgroundColor: "#fca311"
  },
});
export default LoginControllerForm