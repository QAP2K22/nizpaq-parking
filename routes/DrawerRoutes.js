import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerRoutesBotton from './DrawerRoutesBotton';
import Login from '../screens/Login/Login';
import AdminStack from '../screens/Admin/AdminStack';
import VehiclesStack from '../screens/Vehicles/VehiclesStack';


const Tab = createStackNavigator();


const DrawerRoutes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen
          name='Login'
          component={Login}
        />
        <Tab.Screen
          name='AdminStack'
          component={AdminStack}
        />
        <Tab.Screen
          name="VehiclesStack"
          component={VehiclesStack}
          options={{
            headerShown: false,
            title: 'Veiculos',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="car-side" color={color} size={size} />
            ),
          }} />
        <Tab.Screen
          name='StackRoutes'
          component={DrawerRoutesBotton}
        />
      </Tab.Navigator>
    </NavigationContainer>

  )
}

export default DrawerRoutes