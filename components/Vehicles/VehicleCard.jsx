import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper'

const VehicleCard = ({ vehicleData = [], vehicleModel = "carro", vehicleModelNameIcon = "car", vehicleName = "Fusion", vehicleColor = "Branco", vehiclePlate = "231213", garageName = "", garageDate = "", disableButtons = false, setVisitedVehicle, navigation }) => {

    const text = () => {
        return (
            <View>
               {/*  {garageName ?
                    <Text>Garagem: <Text>{garageName}</Text></Text> : <></>
                }
                {garageDate ?
                    <Text>Data: <Text>{garageDate}</Text></Text> : <></>
                } */}
            </View>
        )
    }


    return (
        <Card style={styles.Card}>
            <Card.Title
                title={`${vehicleName} - ${vehicleColor}`}
                subtitle={`Placa: ${vehiclePlate} | Tipo: ${vehicleModel}`}
                left={(props) => <Avatar.Icon {...props} style={{ backgroundColor: '#FFC300' }} color={'#FFF'} icon={vehicleModelNameIcon} />}
                right={() => text()}
            />

            {!disableButtons ?
                <View style={styles.ButtonsView}>
                    <Button icon={"treasure-chest"} mode={"elevated"} style={styles.ButtonStyle} labelStyle={{ color: "white" }} onPress={() => setVisitedVehicle(vehicleData)}>Guardar</Button>
                    <Button icon={"pencil"} mode={"elevated"} style={styles.ButtonStyle} labelStyle={{ color: "white" }} onPress={() => navigation.navigate("vehicles-form", { action: "AlterItem", value: vehicleData, id: garageName })}>Editar</Button>
                </View> : <></>
            }
        </Card>
    )
}

const styles = StyleSheet.create({
    Card: {
        margin: 7,
        backgroundColor: "#ebebeb"
    },
    ButtonsView: {
        alignContent: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        marginBottom: 10
    },
    ButtonStyle: {
        backgroundColor: "#001d3d",
        borderColor: "transparent",
        marginEnd: 5
    }
});

export default VehicleCard