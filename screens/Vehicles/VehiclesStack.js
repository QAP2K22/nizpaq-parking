import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Vehicles from './Vehicles';
import VehiclesForm from './VehiclesForm';
import HeaderRight from '../../components/HeaderIcon/HeaderIcon';

const Stack = createNativeStackNavigator();

const VehiclesStack = ({navigation}) => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="vehicles"
                screenOptions={{
                    tabBarActiveTintColor: '#001d3d',
                    headerStyle: { backgroundColor: "#001d3d" },
                    headerTintColor: "#FFF",
                    headerRight: () => (
                        <HeaderRight navigation={navigation} setReturn={true}/>
                    ),
                }}>
                <Stack.Screen name="vehicles" component={Vehicles} options={{ title: 'Veiculos Estacionados' }} />
                <Stack.Screen name="vehicles-form" component={VehiclesForm} options={{ title: 'Editar veiculo' }} />
            </Stack.Navigator>
        </>
    )
}

export default VehiclesStack