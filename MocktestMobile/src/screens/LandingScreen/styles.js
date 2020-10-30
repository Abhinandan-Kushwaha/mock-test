import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    landingContainer: {
        display: "flex",
        flex: 1,
        justifyContent: "center"
    },

    landingBox: {
        display: "flex",
        padding: 20,
        flexDirection: "column",
        marginHorizontal: 20,
        marginTop: 20,
        height: 300,
        borderColor: 'rgb(206, 206, 206)',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'rgb(98, 123, 155)',
    },

    loader: {
        marginTop: 250,
        textAlign: "center",
    },

    hintBox: {
        marginTop: 40,
        textAlign: "justify",
    },

    idsRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 40,
    },

    ids: {
        color: "yellow",
        fontSize: 18,
        fontWeight: 'bold'
    },
    normalTextStyle: {
        color: 'white',
        fontSize: 18,
        textAlign: 'justify'
    }
});
