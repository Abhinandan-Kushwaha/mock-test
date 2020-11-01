import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    resultContainer: {
        flex: 1,
        backgroundColor: "#F3F7F7",
    },
    resultHeader: {
        backgroundColor: 'rgb(98, 123, 155)',
        display: "flex",
        flexDirection: "row",
        height: 50,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    resultBox: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        color: "black",
    },

    backBtn: {
        position: "absolute",
        left: 10,
        top: 80,
        // cursor: pointer,
    },

    resultRow: {
        display: "flex",
        flexDirection: "row",
    },

    resultRowHighlighted: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "yellow",
    },

    cell: {
        height: 40,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },


    cellHeader: {
        color: "blue",
        fontWeight: "bold",
    },

    cellRed: {
        color: "red",
    },

    cellGreen: {
        color: "green",
    },
    pie: {
        margin: 15
    }
});