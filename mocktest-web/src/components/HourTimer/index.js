import React from 'react'
import { useState, useEffect } from 'react';
import Timer from 'react-compound-timer';

const HourTimer = (props) => {
    const { onTimeUp } = props;
    return (
        <div>
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
                        <Timer.Hours /> :
                        <Timer.Minutes />
                    </React.Fragment>
                )}
            </Timer>
        </div>
    )
}

export default HourTimer;