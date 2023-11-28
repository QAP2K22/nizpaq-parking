import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button/Button";
import { Icon } from "react-native-paper";

const AdminOptions = ({ navigation }) => {
  function VehTypeText() {
    return (
      <View style={styles.textContainer}>
        <Icon
          source="car-multiple"
          color={"#FFC300"}
          size={40}
        />
        <Text style={styles.textStyle}>Tipos de Veiculos</Text>
      </View>
    )
  }

  function GaragesText() {
    return (
      <View style={styles.textContainer}>
        <Icon
          source="parking"
          color={"#FFC300"}
          size={40}
        />
        <Text style={styles.textStyle}>Cadastrar Garagem</Text>
      </View>
    )
  }

  function LoginsText() {
    return (
      <View style={styles.textContainer}>
         <Icon
          source="account-multiple-plus"
          color={"#FFC300"}
          size={40}
        />
        <Text style={styles.textStyle}>Logins</Text>
      </View>
    )
  }

  function Proposicoes() {
    return (
      <View style={styles.textContainer}>
         <Icon
          source="dev-to"
          color={"#FFC300"}
          size={40}
        />
        <Text style={styles.textStyle}>Desenvolvimento</Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.flexDirectionRow}>

        <Button labelText={VehTypeText()} initialPageButton={true} usePush={false} routeName="AdminStack" routeObject={{ screen: "vehiclesTypes" }} navigation={navigation} />
        <Button labelText={GaragesText()} initialPageButton={true} usePush={false} routeName="GaragesStack" routeObject={{ screen: "garages-form", params:{action: "CreateGarage"} }} navigation={navigation} />
        <Button labelText={LoginsText()} initialPageButton={true} usePush={false} routeName="AdminStack" routeObject={{ screen: "loginController" }} navigation={navigation} />
        <Button labelText={Proposicoes()} initialPageButton={true} usePush={false} routeName="Proposicoes" routeObject={{ screen: "proposicoes" }} navigation={navigation} />

        <StatusBar style="auto" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65
  },

  flexDirectionRow: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },

  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000"
  },

  textImage: {
    width: 50,
    height: 30,
  }
});

export default AdminOptions