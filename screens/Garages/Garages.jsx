import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import GarageCard from '../../components/Garages/GarageCard'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Garages = ({ navigation }) => {
    const [data, setData] = useState({})
    useFocusEffect(
        /*Da reload quando a tela está focada.*/
        React.useCallback(() => {
            getData()
        }, [])
    );

    const getData = async () => {
        const response = await AsyncStorage.getItem("garageName")
        const garageName = response ? JSON.parse(response) : []
        setData(garageName)
    }
    
    return (
        <View style={styles.Container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <GarageCard garageName={item.garageName} garageIcon={item.garageIcon} garageStatus={item.garageStatus} totalVacancy={item.garageVacany} ocupedCacancy={item.ocupedCacancy} garageData={item} navigation={navigation} />}
                keyExtractor={item => item.garageName}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFF',
    }
});


export default Garages