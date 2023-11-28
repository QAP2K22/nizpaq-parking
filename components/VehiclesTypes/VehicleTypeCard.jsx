import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper'

const VehicleTypeCard = ({ vehicleIconName = "car", vehicleTypeName = "Carr", buttonDisable = false, previewTextEnable = false, vehicleTypeValue = [], removeItem, alterItem, navigation }) => {

    return (
        <View style={styles.Card}>
            {previewTextEnable ?
                <Text variant="titleLarge" style={{ textAlign: "center" }}>Preview</Text> : <></>
            }
            <Card style={{
                backgroundColor: "#ebebeb"
            }}>
                <Card.Title
                    title={`Modelo: ${vehicleTypeName}`}
                    subtitle=""
                    left={(props) => <Avatar.Icon style={{ backgroundColor: '#FFC300' }} color={'#FFF'}  {...props} icon={vehicleIconName} />}
                />

                <View style={styles.ButtonsView}>
                    <Button disabled={buttonDisable} style={styles.ButtonStyle} labelStyle={{ color: "white" }} onPress={() => removeItem(true)}>Remover</Button>
                    <Button disabled={buttonDisable} style={styles.ButtonStyle} labelStyle={{ color: "white" }} onPress={() => navigation.push("vehiclesTypes-form",{ value: vehicleTypeValue, action: "AlterItem" })}>Editar</Button>
                </View>

            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    Card: {
        marginTop: 20,
        width: "90%",
    },

    Input: {
        width: "90%",
        backgroundColor: '#FFF',
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

export default VehicleTypeCard