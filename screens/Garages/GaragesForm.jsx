import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { mask } from 'react-native-mask-text'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { showMessage, hideMessage } from "react-native-flash-message"
import * as yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GaragesForm = ({ navigation, route }) => {
  const { action, value: garageValue } = route.params
  let defaultValues = { garageName: '', garageAdress: '', garageCEP: '', garageVacany: '', garageOwner: '', ownerNumber: '', ownerCPF: '' }

  if (garageValue) {
    defaultValues.garageName = garageValue.garageName,
      defaultValues.garageAdress = garageValue.garageAdress,
      defaultValues.garageCEP = garageValue.garageCEP,
      defaultValues.garageVacany = garageValue.garageVacany,
      defaultValues.garageOwner = garageValue.garageOwner,
      defaultValues.ownerNumber = garageValue.ownerNumber,
      defaultValues.ownerCPF = garageValue.ownerCPF
  }

  const loginValidationSchema = yup.object().shape({
    garageName: yup
      .string()
      .required('Você precisa inserir um nome para a garagem.'),
    garageAdress: yup
      .string()
      .required('Você precisa inserir um endereço para a garagem.'),
    garageCEP: yup
      .string()
      .min(8, ({ min }) => `O CEP precisa ter 8 números.`)
      .required('Você precisa inserir um CEP para a garagem.'),
    garageVacany: yup
      .number()
      .min(1, ({ min }) => `A garagem precisa de no mínimo 1 vaga.`)
      .required('Você precisa inserir uma quantidade de vagas.'),
    garageOwner: yup
      .string()
      .required('Você precisa inserir um nome.'),
    ownerNumber: yup
      .string()
      .min(16, ({ min }) => `O telefone precisa ter 14 números.`)
      .required('Você precisa inserir um telefone.'),
    ownerCPF: yup
      .string()
      .min(14, ({ min }) => `O CPF precisa ter 14 números.`)
      .required('Você precisa inserir um CPF.'),
  })

  const AddGarage = async (values) => {
    const response = await AsyncStorage.getItem("garageName")
    const garageName = response ? JSON.parse(response) : []
    if (action !== "AlterItem") {
      const testValue = garageName.find((value) => value.garageName == values.garageName)
      if (!testValue) {
        values["ocupedCacancy"] = 0
        values["garageStatus"] = true
        garageName.push(values)
        await AsyncStorage.setItem("garageName", JSON.stringify(garageName));
        showMessage({
          message: "Cadastro sucessido",
          description: "Sua garagem foi cadastrada com sucesso.",
          type: "success",
        })
        navigation.goBack()

      } else {
        showMessage({
          message: "Garage existente",
          description: "Por favor, cadastre um outro nome de garagem.",
          type: "danger",
        })
      }

    } else {
      if (garageValue) {
        const index = garageName.findIndex(object => {
          return object.garageName == values.garageName
        });

        garageName.splice(index, 1, values)

        await AsyncStorage.setItem("garageName", JSON.stringify(garageName))
        showMessage({
          message: "Garagem alterado",
          description: "Sua garagem foi alterada com sucesso.",
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
        onSubmit={values => AddGarage(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <>
            <TextInput
              mode={"outlined"}
              name={"garageName"}
              label={"Nome"}
              placeholder={"Digite o nome da garagem"}
              onChangeText={handleChange('garageName')}
              value={values.garageName}
              error={errors.garageName}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />
            <HelperText type="error" visible={errors.garageName && touched.garageName}>
              {errors.garageName}
            </HelperText>


            <TextInput
              mode={"outlined"}
              name={"garageAdress"}
              label={"Endereço"}
              placeholder={"Digite o endereço da garagem"}
              onChangeText={handleChange('garageAdress')}
              value={values.garageAdress}
              error={errors.garageAdress}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}
            />
            <HelperText type="error" visible={errors.garageAdress && touched.garageAdress}>
              {errors.garageAdress}
            </HelperText>

            <TextInput
              mode={"outlined"}
              name={"garageCEP"}
              label={"CEP"}
              placeholder={"Digite o CEP da garagem"}
              keyboardType={"phone-pad"}
              onChangeText={(text) => { const code = mask(text, "99999-999"); handleChange('garageCEP')(code) }}
              value={values.garageCEP}
              error={errors.garageCEP}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />
            <HelperText type="error" visible={errors.garageCEP && touched.garageCEP}>
              {errors.garageCEP}
            </HelperText>
            <TextInput
              mode={"outlined"}
              name={"garageImage"}
              label={"Imagem"}
              placeholder={"Insira o link da imagem."}
              keyboardType={"phone-pad"}
              onChangeText={handleChange('garageImage')}
              value={values.garageImage}
              error={errors.garageImage}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />
            <HelperText type="error" visible={errors.garageImage && touched.garageImage}>
              {errors.garageImage}
            </HelperText>

            <TextInput
              mode={"outlined"}
              name={"garageOwner"}
              label={"Proprietário"}
              placeholder={"Digite o nome do proprietário"}
              onChangeText={handleChange('garageOwner')}
              value={values.garageOwner}
              error={errors.garageOwner}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />
            <HelperText type="error" visible={errors.garageOwner && touched.garageOwner}>
              {errors.garageOwner}
            </HelperText>

            <TextInput
              mode={"outlined"}
              name={"ownerNumber"}
              label={"Número"}
              placeholder={"Digite o número do proprietário"}
              keyboardType={"phone-pad"}
              onChangeText={(text) => { const code = mask(text, "(99) 9 9999-9999"); handleChange('ownerNumber')(code) }}
              value={values.ownerNumber}
              error={errors.ownerNumber}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}
            />
            <HelperText type="error" visible={errors.ownerNumber && touched.ownerNumber}>
              {errors.ownerNumber}
            </HelperText>

            <TextInput
              mode={"outlined"}
              name={"ownerCPF"}
              label={"CPF"}
              placeholder={"Digite o CPF do proprietário"}
              keyboardType={"phone-pad"}
              onChangeText={(text) => { const code = mask(text, "999.999.999-99"); handleChange('ownerCPF')(code) }}
              value={values.ownerCPF}
              error={errors.ownerCPF}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />
            <HelperText type="error" visible={errors.ownerCPF && touched.ownerCPF}>
              {errors.ownerCPF}
            </HelperText>

            <TextInput
              mode={"outlined"}
              name={"garageVacany"}
              label={"Vagas"}
              placeholder={"Digite a quantidade de vagas"}
              keyboardType={"phone-pad"}
              onChangeText={handleChange('garageVacany')}
              value={values.garageVacany}
              error={errors.garageVacany}
              style={styles.input}
              theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

            />
            <HelperText type="error" visible={errors.garageVacany && touched.garageVacany}>
              {errors.garageVacany}
            </HelperText>

            <Button onPress={handleSubmit} mode={"contained"} style={styles.ButtonStyle}>{action=="AlterItem"||false?"Editar":"Cadastrar"}</Button>
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
export default GaragesForm