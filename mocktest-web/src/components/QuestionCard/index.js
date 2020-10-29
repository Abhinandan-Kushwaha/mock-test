import React from 'react';
import './index.css';

export const QuestionCard = (props) => {
    const { questionDetails } = props;
    const { questionNumber, text, isImage, imageUrl } = questionDetails;
    return (
        <div className="questionContainer">
            <div className="questionHeader">
                <div className="questionNumberContainer">
                    {questionNumber}
                </div>

                <div className="questionTextContainer">
                    {text}
                </div>
            </div>
            {isImage
                &&
                <div className="questionImageContainer">
                    <img
                        src={imageUrl}
                        className="questionImage" />
                </div>
            }
            {renderOptions(props)}
        </div>
    )
}
const renderOptions = (props) => {
    const { questionDetails, selectedOptionNumber, optionPressed } = props;
    const { options } = questionDetails;
    return (
        <div className="optionsContainer">
            {options.map((option, key) => {
                const { optionNumber, text, isImage, imageUrl } = option;
                return (
                    <div className="optionsRow">
                        <div className={
                            optionNumber === selectedOptionNumber
                                ? "selectedOptionCircle"
                                : "optionCircle"}

                            onClick={() => optionPressed(optionNumber)} />

                        {isImage
                            ?
                            <div className="optionImageContainer">
                                <img
                                    src={imageUrl}
                                    className="optionImage" />
                            </div>
                            :
                            <div className="optionTextContainer">
                                {text}
                            </div>}
                    </div>
                )
            })}
        </div>
    )
}