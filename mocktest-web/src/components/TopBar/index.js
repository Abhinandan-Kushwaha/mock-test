import React from 'react';
import './index.css';
import { Button } from '../Button';
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

export const TopBar = (props) => {
    const { onBookmarkPress } = props;
    return (
        <div className="topBarContainer">
            <Button
                backgroundColor={"black"}
                onClick={onBookmarkPress}
                text={"Bookmark"}
                icon={faBookmark}
            />
        </div>
    )
}