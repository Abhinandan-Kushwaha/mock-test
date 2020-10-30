import React from 'react';
import { View, Text } from 'react-native';
import Timer from 'react-compound-timer';

const HourTimer = (props) => {
    const { onTimeUp } = props;
    return (
        <View>
            <Timer
                initialTime={3 * 60 * 60 * 1000 + 60000}
                startImmediately={true}
                direction="backward"
                checkpoints={[
                    {
                        time: 0,
                        callback: onTimeUp,
                    }
                ]}
            >
                {() => (
                    <React.Fragment>
                        <Text>
                            <Timer.Hours /> :
                        <Timer.Minutes />
                        </Text>
                    </React.Fragment>
                )}
            </Timer>
        </View>
    )
}

export default HourTimer;