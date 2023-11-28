import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react'
import Garages from './Garages';
import GaragesForm from './GaragesForm';
import HeaderRight from '../../components/HeaderIcon/HeaderIcon';

const Stack = createNativeStackNavigator();

const GaragesStack = ({ navigation, route }) => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="garages"
                screenOptions={{
                    tabBarActiveTintColor: '#001d3d',
                    headerStyle: { backgroundColor: "#001d3d" },
                    headerTintColor: "#FFF",
                    headerRight: () => (
                        <HeaderRight navigation={navigation}/>
                    ),
                }}>
                <Stack.Screen name="garages" component={Garages} options={{ title: 'Garagens' }} />
                <Stack.Screen name="garages-form" component={GaragesForm} options={{ title: 'Cadastrar Garagem' }} />
            </Stack.Navigator>
        </>
    )
}

export default GaragesStack