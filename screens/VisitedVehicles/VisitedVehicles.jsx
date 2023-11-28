import React, { useState } from 'react'
import { View } from 'react-native'
import { FlatList, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import VehicleCard from '../../components/Vehicles/VehicleCard'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const VisitedVehicles = ({ navigation, route }) => {
  const [data, setData] = useState({})
  useFocusEffect(
    /*Da reload quando a tela está focada.*/
    React.useCallback(() => {
      getData()
    }, [])
  );

  const getData = async () => {
    const response = await AsyncStorage.getItem("visitedVehicles")
    const vehicles = response ? JSON.parse(response) : []
    setData(vehicles)
  }
  return (
    <View style={styles.Container}>
      <FlatList
        data={data}
        style={{ margin: 10 }}
        renderItem={({ item }) => <VehicleCard vehicleModel={item.vehicleModel} vehicleName={item.vehicleName} vehicleColor={item.vehicleColor} vehiclePlate={item.vehiclePlate} garageName={"Garagem N21"} garageData={"19/12/2023"} disableButtons={true} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

});



export default VisitedVehicles