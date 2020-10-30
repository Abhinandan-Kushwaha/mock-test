import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F7F7',
    },
    loader: {
        display: "flex",
        flex: 1,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        color: "#282c34",
    },
    topBarContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgb(98, 123, 155)',
        justifyContent: 'space-between',
        alignItems: "center",
        height: 60,
        paddingHorizontal: 10,
    },

    omrModal: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: "absolute",
        top: 0,
        left: 0,
    }
});
