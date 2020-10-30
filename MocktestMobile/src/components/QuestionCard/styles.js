import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    questionContainer: {
        flex: 1,
        height: 50,
        padding: 10,
    },
    questionHeader: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 10,
        alignItems: "center",
    },
    questionNumberContainer: {
        display: "flex",
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderWidth: 1,
        backgroundColor: "black",
        borderRadius: 10,
    },
    questionTextContainer: {
        marginHorizontal: 10,
        color: "black",
    },
    optionsContainer: {
        padding: 10,
        color: "black",
    },
    optionsRow: {
        flexDirection: "row",
        display: "flex",
        marginBottom: 10,
        alignItems: "center",
    },
    optionCircle: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderRadius: 11,
    },
    selectedOptionCircle: {
        height: 20,
        width: 20,
        borderWidth: 2,
        borderColor: "gray",
        backgroundColor: "green",
        borderRadius: 11,
    },
    optionTextContainer: {
        marginLeft: 10,
    },
    blackTextStyle: {
        fontSize: 18,
    },
    whiteTextStyle: {
        color: 'white',
        fontSize: 18,
    },
    questionImage: {
        height: 200,
        width: 300,
        resizeMode: 'contain'
    },
    optionImage: {
        height: 200,
        width: 200,
        resizeMode: 'contain'
    }
});