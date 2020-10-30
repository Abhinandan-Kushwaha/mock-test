import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Button } from '../Button';

export const ButtonBar = (props) => {
    const { nextPressed, skipPressed, nextLoading, selectedOptionNumber } = props;
    return (
        <View style={styles.buttonBarContainer}>
            <Button
                onClick={nextLoading ? null : skipPressed}
                backgroundColor={nextLoading ? "gray" : "black"}
                text={"Skip"} />
            <Button
                onClick={selectedOptionNumber === 0 || nextLoading ? null : nextPressed}
                backgroundColor={selectedOptionNumber === 0 || nextLoading ? "gray" : "green"}
                text={"Next"} />

        </View>
    )
}