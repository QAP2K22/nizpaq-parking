import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react'
import GaragesStack from "../screens/Garages/GaragesStack"
import VisitedVehicles from "../screens/VisitedVehicles/VisitedVehicles"
import AdminStack from "../screens/Admin/AdminStack"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserIsAdmin } from '../auth/auth';
import HeaderRight from '../components/HeaderIcon/HeaderIcon';

const Tab = createBottomTabNavigator();

const DrawerRoutesBotton = ({navigation}) => {
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        setIsAdmin(UserIsAdmin())
    }, [])

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#000814',
                headerStyle: { backgroundColor: "#001d3d" },
                headerTintColor: "#FFF"
            }}
        >
            <Tab.Screen
                name="GaragesStack"
                component={GaragesStack}
                options={{
                    title: 'Garagens',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="car-select" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen
                name="VisitedVehicles"
                component={VisitedVehicles}
                options={{
                    title: 'Veiculos Visitados',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="garage" color={color} size={size} />
                    ),
                    headerRight: () => (
                        <HeaderRight navigation={navigation} setReturn={false}/>
                    ),
                }}
            />
            {isAdmin ?
                <Tab.Screen
                    name="AdminStack"
                    component={AdminStack}
                    options={{
                        headerShown: false,
                        title: 'Admin',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-star" color={color} size={size} />
                        ),
    
                    }}
                /> : <></>


            }
        </Tab.Navigator>
    )
}

export default DrawerRoutesBotton