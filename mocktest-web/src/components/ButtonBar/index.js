import React from 'react';
import './index.css';
import { Button } from '../Button';

export const ButtonBar = (props) => {
    const { nextPressed, selectedOptionNumber } = props;
    return (
        <div className="buttonBarContainer">
            <Button
                onClick={nextPressed}
                backgroundColor={"black"}
                text={"Skip"} />
            <Button
                onClick={selectedOptionNumber === 0 ? null : nextPressed}
                backgroundColor={selectedOptionNumber === 0 ? "gray" : "green"}
                text={"Next"} />

        </div>
    )
}