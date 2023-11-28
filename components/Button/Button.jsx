import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

const Button = ({ labelText = "", routeName = "", routeObject = [], usePush = true, initialPageButton = false, navigation }) => {

    const isPush = () => {
        if (usePush) {
            navigation.push(routeName)
        } else {
            navigation.navigate(routeName, routeObject)
        }
    }

    return (
        <TouchableOpacity style={[initialPageButton ? styles.buttonStylelarge : styles.buttonStyle]} onPress={() => isPush()}>
            <View style={[initialPageButton ? styles.buttonSpaceLarge : styles.buttonSpace]}>
                <Text style={styles.buttonText}>{labelText}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonStyle: {
        width: 100,
        height: 87,
        margin: 8,
        backgroundColor: "#D9D9D9",
        borderRadius: 20
    },
    buttonSpace: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStylelarge: {
        width: 160,
        height: 147,
        margin: 8,
        backgroundColor: "#D9D9D9",
        borderRadius: 20
    },
    buttonSpaceLarge: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    }
});