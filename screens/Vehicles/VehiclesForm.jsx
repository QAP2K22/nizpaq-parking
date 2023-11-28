import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { useFocusEffect } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { mask } from 'react-native-mask-text'
import { Button, HelperText, Menu, Provider, Text, TextInput } from 'react-native-paper'
import * as yup from 'yup'

const VehiclesForm = ({ navigation, route }) => {
    const [vehTypeData, setVehTypeData] = useState([])
    const { action, value: vehicleValue } = route.params
    console.log(route.params.id)
    let defaultValues = { vehicleName: '', vehicleColor: '', vehiclePlate: '', vehicleTypeName: '', ownerName: '', ownerNumber: '', ownerCPF: '' }

    if (vehicleValue) {
        defaultValues.vehicleName = vehicleValue.vehicleName,
            defaultValues.vehicleColor = vehicleValue.vehicleColor,
            defaultValues.vehiclePlate = vehicleValue.vehiclePlate,
            defaultValues.vehicleTypeName = vehicleValue.vehicleTypeName,
            defaultValues.ownerName = vehicleValue.ownerName,
            defaultValues.ownerNumber = vehicleValue.ownerNumber,
            defaultValues.ownerCPF = vehicleValue.ownerCPF
    }

    useFocusEffect(
        /*Da reload quando a tela está focada.*/
        React.useCallback(() => {
            getData()
        }, [])
    );

    const getData = async () => {
        const response = await AsyncStorage.getItem("vehicleType")
        const vehType = response ? JSON.parse(response) : []
        setVehTypeData(vehType)
    }

    const loginValidationSchema = yup.object().shape({
        ownerName: yup
            .string()
            .required('Você precisa inserir um nome.'),
        vehicleName: yup
            .string()
            .required('Você precisa inserir um modelo de veiculo.'),
        vehicleColor: yup
            .string()
            .required('Você precisa inserir uma cor para o veiculo.'),
        vehiclePlate: yup
            .string()
            .min(5, ({ min }) => `A placa precisa ter no mínimo 5 caracteres`)
            .required('Você precisa inserir uma placa para o veiculo.'),
        ownerNumber: yup
            .string()
            .min(16, ({ min }) => `O telefone precisa ter 14 números.`)
            .required('Você precisa inserir um telefone.'),
        ownerCPF: yup
            .string()
            .min(14, ({ min }) => `O CPF precisa ter 14 números.`)
            .required('Você precisa inserir um CPF.'),
    })

    const AddVehicle = async (values) => {
        const response = await AsyncStorage.getItem("vehiclesGarages:"+route.params.id)
        const garageName = response ? JSON.parse(response) : []
        if (action !== "AlterItem") {
            const testValue = garageName.find((value) => value.vehiclePlate == values.vehiclePlate)
            if (!testValue) {

                const vehTypeIcon = vehTypeData.find((value) => value.vehicleTypeName == values.vehicleTypeName)
                if (vehTypeIcon) {
                    values["vehicleTypeIconName"] = vehTypeIcon.vehicleTypeIconName
                } else {
                    values["vehicleTypeIconName"] = "car"
                }
                garageName.push(values)
                await AsyncStorage.setItem("vehiclesGarages:"+route.params.id, JSON.stringify(garageName));
                showMessage({
                    message: "Cadastro sucessido",
                    description: "Seu veiculo cadastrada com sucesso.",
                    type: "success",
                })
                navigation.goBack()

            } else {
                showMessage({
                    message: "Veiculo existente",
                    description: "Por favor, cadastre um outro veiculo de garagem.",
                    type: "danger",
                })
            }

        } else {
            if (vehicleValue) {
                const index = garageName.findIndex(object => {
                    return object.vehiclePlate == values.vehiclePlate
                });

                const vehTypeIcon = vehTypeData.find((value) => value.vehicleTypeName == values.vehicleTypeName)
               
                if (vehTypeIcon) {
                    values["vehicleTypeIconName"] = vehTypeIcon.vehicleTypeIconName
                } else {
                    values["vehicleTypeIconName"] = "car"
                }

                console.log(values)


                garageName.splice(index, 1, values)

                await AsyncStorage.setItem("vehiclesGarages:"+route.params.id, JSON.stringify(garageName))
                showMessage({
                    message: "Veiculo alterado",
                    description: "Veiculo foi alterada com sucesso.",
                    type: "success",
                })
            }

        }
    }

    return (
        <View style={styles.container}>
            <Formik
                initialValues={defaultValues}
                onSubmit={values => AddVehicle(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                    <>
                        <TextInput
                            mode={"outlined"}
                            name={"ownerName"}
                            label={"Nome"}
                            placeholder={"Digite o nome do proprietário"}
                            onChangeText={handleChange('ownerName')}
                            value={values.ownerName}
                            error={errors.ownerName}
                            style={styles.input}
                            theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

                        />
                        <HelperText type="error" visible={errors.ownerName && touched.ownerName}>
                            {errors.ownerName}
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
                            name={"vehicleName"}
                            label={"Veiculo"}
                            placeholder={"Digite o nome do veiculo"}
                            onChangeText={handleChange('vehicleName')}
                            value={values.vehicleName}
                            error={errors.vehicleName}
                            style={styles.input}
                            theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

                        />
                        <HelperText type="error" visible={errors.vehicleName && touched.vehicleName}>
                            {errors.vehicleName}
                        </HelperText>

                        <TextInput
                            mode={"outlined"}
                            name={"vehicleColor"}
                            label={"Cor"}
                            placeholder={"Digite a cor do veiculo"}
                            onChangeText={handleChange('vehicleColor')}
                            value={values.vehicleColor}
                            error={errors.vehicleColor}
                            style={styles.input}
                            theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

                        />
                        <HelperText type="error" visible={errors.vehicleColor && touched.vehicleColor}>
                            {errors.vehicleColor}
                        </HelperText>

                        <TextInput
                            mode={"outlined"}
                            name={"vehiclePlate"}
                            label={"Placa"}
                            placeholder={"Digite a placa do veiculo"}
                            onChangeText={handleChange('vehiclePlate')}
                            value={values.vehiclePlate}
                            error={errors.vehiclePlate}
                            style={styles.input}
                            theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}

                        />
                        <HelperText type="error" visible={errors.vehiclePlate && touched.vehiclePlate}>
                            {errors.vehiclePlate}
                        </HelperText>

                        <TextInput
                            mode={"outlined"}
                            name={"vehicleTypeName"}
                            value={values.vehicleTypeName}
                            style={styles.input}
                            theme={{ colors: { primary: '#001d3d', underlineColor: 'transparent' } }}
                            render={() => (
                                <Picker
                                    selectedValue={values.vehicleTypeName}
                                    onValueChange={(itemValue, itemIndex) =>
                                        handleChange('vehicleTypeName')(itemValue)
                                    }
                                    style={{ height: 54 }}
                                >
                                    {vehTypeData.length == 0 ?
                                        <Picker.Item label="Carro" value="carro" />
                                        :
                                        vehTypeData.map((item, key) => (
                                            <Picker.Item key={key} label={item.vehicleTypeName} value={item.vehicleTypeName} />
                                        ))

                                    }
                                </Picker>
                            )}
                        />
                        <HelperText type="error" visible={errors.vehicleTypeName && touched.vehicleTypeName}>
                            {errors.vehicleTypeName}
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
export default VehiclesForm