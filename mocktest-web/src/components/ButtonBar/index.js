import React from 'react';
import './index.css';
import { Button } from '../Button';

export const ButtonBar = (props) => {
    const { nextPressed, skipPressed, nextLoading, selectedOptionNumber } = props;
    return (
        <div className="buttonBarContainer">
            <Button
                onClick={nextLoading ? null : skipPressed}
                backgroundColor={nextLoading ? "gray" : "black"}
                text={"Skip"} />
            <Button
                onClick={selectedOptionNumber === 0 || nextLoading ? null : nextPressed}
                backgroundColor={selectedOptionNumber === 0 || nextLoading ? "gray" : "green"}
                text={"Next"} />

        </div>
    )
}