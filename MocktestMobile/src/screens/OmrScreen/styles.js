import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    omrContainer: {
        overflow: "scroll",
        flexDirection: "column",
        flex: 1,
    },
    omrHeader: {
        backgroundColor: 'rgb(98, 123, 155)',
        display: "flex",
        flexDirection: "column",
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },

    userDetailsRow: {
        display: "flex",
        flexDirection: "column",
    },

    omrBox: {
        backgroundColor: "#F3F7F7",
        flex: 1,
    },

    omrQuestionRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        color: "black",
    },

    bubble: {
        height: 16,
        width: 16,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 10,
    },
    markedBubble: {
        height: 16,
        width: 16,
        backgroundColor: "black",
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 10,
    },

    omrQnumber: {
        display: "flex",
        height: 40,
        width: 30,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    bookmarkContainer: {
        display: "flex",
        height: 40,
        width: 30,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    omrBubbles: {
        display: "flex",
        flexDirection: "row",
        height: 40,
        width: 180,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },

    whiteTextStyle: {
        color: 'white',
        fontSize: 18,
    },

    blackTextStyle: {
        fontSize: 18,
    },

    iconStyle: {
        height: 16,
        width: 12,
        tintColor: 'blue',
        marginRight: 6,
    }
});