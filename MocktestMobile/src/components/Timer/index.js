import React, { forwardRef, useImperativeHandle } from 'react'
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';

const Timer = forwardRef((props, ref) => {
    const { initialMinute = 0, initialSeconds = 0, onMinuteOver } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);

    useImperativeHandle(ref, () => ({
        resetTime() {
            setMinutes(1);
            setSeconds(0);
        }
    }));


    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setMinutes(1);
                    onMinuteOver();
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <Text> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
    )
});

export default Timer;