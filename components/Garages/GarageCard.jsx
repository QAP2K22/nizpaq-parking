import React from 'react'
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper'
import { UserIsAdmin } from '../../auth/auth';

const GarageCard = ({garageName = "Garagem", garageIcon = "https://cdn.nar.realtor/sites/default/files/styles/inline_paragraph_image/public/assets/images/2208_HD_GarageTrends.png", garageStatus = false, totalVacancy = 0, ocupedCacancy = 0, garageData, navigation }) => {
    return (
        <Card style={styles.Card}>
            <Card.Cover style={styles.CardCover} source={{ uri: garageIcon }} />
            <Card.Content>
                <Text variant="titleLarge">{garageName}</Text>
                <Text variant="bodyMedium">Vagas Totais: {totalVacancy}</Text>
                <Text variant="bodyMedium">Vagas Ocupadas: {ocupedCacancy}</Text>
                <Text variant="bodyMedium">Vagas Restantes: {totalVacancy - ocupedCacancy}</Text>
            </Card.Content>
            <Card.Actions>
                <Button disabled={!garageStatus} style={styles.ButtonStyle} labelStyle={{ color: "white" }} onPress={() => navigation.navigate("VehiclesStack", { screen: "vehicles", params: { id: garageName } })}>Abrir</Button>

                {UserIsAdmin() ?
                    <Button style={styles.ButtonStyle} onPress={() => navigation.navigate("GaragesStack", { screen: "garages-form", params:{action: "AlterItem", value: garageData} })}>Editar</Button> : <></>
                }
            </Card.Actions>
        </Card>
    )
}


const styles = StyleSheet.create({
    Card: {
        marginHorizontal: 13,
        marginTop: 20,
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#ebebeb"
    },

    CardCover: {
        backgroundColor: "transparent",
        padding: 4,
        borderRadius: 0
    },

    ButtonStyle: {
        width: "40%",
        backgroundColor: "#fca311",
        borderRadius: 8,
        borderColor: "transparent",
        padding: 3,
    }
});

export default GarageCard