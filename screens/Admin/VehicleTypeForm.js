import { Formik } from "formik"
import React, { useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper"
import * as yup from "yup"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { showMessage, hideMessage } from "react-native-flash-message"
import VehicleTypeCard from "../../components/VehiclesTypes/VehicleTypeCard"

const VehicleTypeForm = ({ navigation, route }) => {
  const [vehicleType, setVehicleType] = useState("Carro")
  const [vehicleIcon, setVehicleIcon] = useState("car")
  const { action, value: vehicleTypeValue } = route.params
  let defaultValues = { vehicleTypeName: "", vehicleTypeIconName: "car" }

  if (vehicleTypeValue) {
    defaultValues.vehicleTypeName = vehicleTypeValue.vehicleTypeName,
      defaultValues.vehicleTypeIconName = vehicleTypeValue.vehicleTypeIconName
  }

  const loginValidationSchema = yup.object().shape({
    vehicleTypeName: yup
      .string()
      .required("Você precisa inserir um tipo de veiculo."),
    vehicleTypeIconName: yup
      .string()
      .required("Você precisa um nome de ícone"),
  })

  const AddVehicleType = async (values) => {
    const response = await AsyncStorage.getItem("vehicleType")
    const vehiclesType = response ? JSON.parse(response) : []
    if (action !== "AlterItem") {
      const testValue = vehiclesType.find((value) => value.vehicleTypeName == values.vehicleTypeName)
      if (!testValue) {
        vehiclesType.push(values)
        await AsyncStorage.setItem("vehicleType", JSON.stringify(vehiclesType));
        showMessage({
          message: "Cadastro sucessido",
          description: "Seu tipo de veiculo foi cadastrado com sucesso.",
          type: "success",
        })
        navigation.goBack()

      } else {
        showMessage({
          message: "Tipo existente",
          description: "Por favor, cadastre um tipo inexistente.",
          type: "danger",
        })
      }

    } else {
      if (vehicleTypeValue) {
        const index = vehiclesType.findIndex(object => {
          return object.vehicleTypeName == values.vehicleTypeName
        });
        vehiclesType.splice(index, 1, values)

        await AsyncStorage.setItem("vehicleType", JSON.stringify(vehiclesType))
        showMessage({
          message: "Cadastro alterado",
          description: "Seu tipo de veiculo foi alterado com sucesso.",
          type: "success",
        })
        navigation.goBack()
      }

    }
  }

  return (
    <View style={styles.Container}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={defaultValues}
        onSubmit={values => AddVehicleType(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <TextInput
              mode={"outlined"}
              name={"vehicleTypeName"}
              label={"Tipo"}
              placeholder={"Digite o tipo do veiculo"}
              onChangeText={(text) => { handleChange("vehicleTypeName")(text), setVehicleType(text) }}
              onBlur={handleBlur('vehicleTypeName')}
              value={values.vehicleTypeName}
              error={errors.vehicleTypeName}
              style={styles.Input}
              theme={{ colors: { primary: "#001d3d", underlineColor: "transparent" } }}

            />
            <HelperText type="error" visible={errors.vehicleTypeName && touched.vehicleTypeName}>
              {errors.vehicleTypeName}
            </HelperText>

            <TextInput
              mode={"outlined"}
              name={"vehicleTypeIconName"}
              label={"Ícone"}
              placeholder={"Digite o nome do ícone"}
              onChangeText={(text) => { handleChange("vehicleTypeIconName")(text), setVehicleIcon(text) }}
              onBlur={handleBlur('vehicleTypeIconName')}
              value={values.vehicleTypeIconName}
              error={errors.vehicleTypeIconName}
              style={styles.Input}
              theme={{ colors: { primary: "#001d3d", underlineColor: "transparent" } }}
            />
            <HelperText type="error" visible={errors.vehicleTypeIconName && touched.vehicleTypeIconName}>
              {errors.vehicleTypeIconName}
            </HelperText>

            <VehicleTypeCard vehicleTypeName={vehicleType} vehicleIconName={vehicleIcon} buttonDisable={true} previewTextEnable={true} navigation={navigation} />

            <Button onPress={handleSubmit} mode={"contained"} style={styles.ButtonStyle}>{action == "AlterItem" || false ? "Editar" : "Cadastrar"}</Button>
          </>
        )}
      </Formik>
    </View >
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },

  Input: {
    width: "90%",
    backgroundColor: "#FFF",
  },

  ButtonStyle: {
    width: "80%",
    marginTop: 30,
    padding: 3,
    backgroundColor: "#fca311"
  },

});
export default VehicleTypeForm