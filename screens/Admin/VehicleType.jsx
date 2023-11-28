import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import VehicleTypeCard from "../../components/VehiclesTypes/VehicleTypeCard"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
const VehicleType = ({ navigation }) => {
    const [data, setData] = useState([])

    useFocusEffect(
        /*Da reload quando a tela está focada.*/
        React.useCallback(() => {
            getData()
        }, [])
    );

    const getData = async () => {
        const response = await AsyncStorage.getItem("vehicleType")
        const vehType = response ? JSON.parse(response) : []
        setData(vehType)
    }
    const removeItem = async (value) => {
        const newVehicles = data.filter(p => p !== value)
        await AsyncStorage.setItem("vehicleType", JSON.stringify(newVehicles))
        setData(newVehicles)
    }


    return (
        <View style={styles.Container}>
            <FlatList
                style={styles.FlatList}
                data={data}
                renderItem={({ item }) => <VehicleTypeCard vehicleTypeName={item.vehicleTypeName} vehicleIconName={item.vehicleTypeIconName} buttonDisable={false} previewTextEnable={false} vehicleTypeValue={item} removeItem={() => removeItem(item)} navigation={navigation} />}
                keyExtractor={item => item.id}
            />

            <Button style={styles.ButtonStyle} labelStyle={{ color: "white" }} onPress={() => navigation.push("vehiclesTypes-form",{action: "CreateVehicle"})}>Cadastrar tipo de veiculo</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    FlatList: {
        flex: 1,
        width: "100%",
        marginLeft: 20
    },

    ButtonStyle: {
        backgroundColor: "#fca311",
        borderColor: "transparent",
        padding: 3,
        margin: 5
    }

});

export default VehicleType