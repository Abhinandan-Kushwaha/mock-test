import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Button = (props) => {
    const { onClick, text, backgroundColor, icon } = props;
    return (
        <div
            className="button"
            style={{ backgroundColor: backgroundColor }}
            onClick={onClick}>
            {icon &&
                <FontAwesomeIcon
                    style={{ marginRight: 10 }}
                    icon={icon}
                    color="yellow" />
            }
            {text}
        </div>
    )
}