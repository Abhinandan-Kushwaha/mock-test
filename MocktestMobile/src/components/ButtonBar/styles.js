import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    buttonBarContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 40,
        marginTop: 15,
    },
    skipButton: {
        fontSize: 16,
        color: "whitesmoke",
        backgroundColor: "black",
        borderColor: "gray",
    },
    nextButton: {
        fontSize: 16,
        color: "whitesmoke",
        backgroundColor: "green",
        borderColor: "gray",
    }
})