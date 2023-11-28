import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AdminOptions from './AdminOptions';
import VehicleType from './VehicleType';
import VehicleTypeForm from './VehicleTypeForm';
import HeaderRight from '../../components/HeaderIcon/HeaderIcon';
import LoginController from './LoginController';
import LoginControllerForm from './LoginControllerForm';

const Stack = createNativeStackNavigator();

const AdminStack = ({ navigation, route }) => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="adminOptions"
                screenOptions={{
                    tabBarActiveTintColor: '#001d3d',
                    headerStyle: { backgroundColor: "#001d3d" },
                    headerTintColor: "#FFF",
                    headerRight: () => (
                      <HeaderRight navigation={navigation}/>
                  ),
                }}>
                <Stack.Screen name="adminOptions" component={AdminOptions} options={{ title: 'Opções de gerência' }} />
                <Stack.Screen name="loginController" component={LoginController} options={{ title: 'Funcionários cadastrados' }} />
                <Stack.Screen name="loginController-form" component={LoginControllerForm} options={{ title: 'Cadastrar funcionário' }} />
                <Stack.Screen name="vehiclesTypes" component={VehicleType} options={{ title: 'Tipos de veiculos' }} />
                <Stack.Screen name="vehiclesTypes-form" component={VehicleTypeForm} options={{ title: 'Adicionar tipo de veiculo' }} />
            </Stack.Navigator>
        </>
    )
}

export default AdminStack