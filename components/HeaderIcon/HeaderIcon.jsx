import { IconButton } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message"

const HeaderRight = ({ navigation, setReturn }) => {

    const logout = () => {
        if (setReturn) {
            navigation.navigate("GaragesStack")
        } else {
            navigation.navigate("Login")
            showMessage({
                message: "Desconectado com sucesso",
                description: "Você foi desconectado com sucesso.",
                type: "success",
            })
        }
       
    }
    return (
        <IconButton
            icon={setReturn?"keyboard-return":"logout"}
            iconColor={"#FFF"}
            onPress={() => logout()}
        />
    );
};

export default HeaderRight;