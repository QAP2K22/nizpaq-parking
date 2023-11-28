import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import VehicleCard from '../../components/Vehicles/VehicleCard'
import { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Vehicles = ({ navigation, route }) => {
    const [data, setData] = useState({})

    useFocusEffect(
        /*Da reload quando a tela está focada.*/
        React.useCallback(() => {
            getData()
        }, [])
    );

    const getData = async () => {
        const response = await AsyncStorage.getItem("vehiclesGarages:"+route.params.id)
        const vehicles = response ? JSON.parse(response) : []
        setData(vehicles)
    }

    const removeVehicle = async (value) => {
        const newVehicles = data.filter(p => p !== value)
        await AsyncStorage.setItem("vehiclesGarages:"+route.params.id, JSON.stringify(newVehicles))

        const response = await AsyncStorage.getItem("visitedVehicles")
        const vehicles = response ? JSON.parse(response) : []
        vehicles.push(value)

        await AsyncStorage.setItem("visitedVehicles", JSON.stringify(vehicles))

        setData(newVehicles)
    }

    return (
        <View style={styles.Container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <VehicleCard vehicleData={item} vehicleModel={item.vehicleModel} vehicleName={item.vehicleName} vehicleModelNameIcon={item.vehicleTypeIconName} vehicleColor={item.vehicleColor} vehiclePlate={item.vehiclePlate} garageName={route.params.id} setVisitedVehicle={(value)=>removeVehicle(value)} navigation={navigation} />}
                keyExtractor={item => item.vehiclePlate}
            />

            <Button style={styles.ButtonStyle} labelStyle={{ color: "white" }} onPress={() => navigation.push("vehicles-form", { id: route.params.id })}>Cadastrar Veiculo</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    ButtonStyle: {
        backgroundColor: "#fca311",
        borderColor: "transparent",
        padding: 3,
        margin: 5
    }

});

export default Vehicles