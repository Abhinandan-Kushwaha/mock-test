import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const OmrScreen = props => {
    const [state, setState] = useState({
        omrQuestionSet: []
    });
    let questions = useSelector(state => state.test.questions);
    const userResponses = useSelector(state => state.test.userResponses);
    const bookmarkedQuestions = useSelector(state => state.test.bookmarkedQuestions);
    const userId = useSelector(state => state.user.userId);
    const userName = useSelector(state => state.user.userName);

    useEffect(() => {
        let omrQuestionSet = questions;
        userResponses.forEach(userResponse => {
            const { questionNumber, option } = userResponse;
            omrQuestionSet[questionNumber - 1].marked = option - 1;
        })
        bookmarkedQuestions.forEach(bookmarkedQuestion => {
            omrQuestionSet[bookmarkedQuestion - 1].bookmarked = true;
        })
        setState({ ...state, omrQuestionSet });
    }, [])

    return (
        <div className="omrContainer">
            <div
                onClick={props.backPressed}
                className="backButton">
                Back
            </div>
            <div className="omrHeader">
                Your OMR Sheet
                <div className="userDetailRow">
                    Id: <span style={{ color: 'yellow' }}>{userId}</span>
                    <span style={{ marginLeft: 20 }}>Name: <span style={{ color: 'yellow' }}>{userName}</span></span>
                </div>
            </div>
            <div className="omrBox">
                {state.omrQuestionSet.map((question, questionKey) => {
                    return (
                        <div className="omrQuestionRow">
                            <div className="bookmarkContainer">
                                {question.bookmarked &&
                                    <FontAwesomeIcon
                                        icon={faBookmark}
                                        color="blue" />
                                }
                            </div>
                            <div className="omrQnumber">
                                {question.questionNumber}
                            </div>
                            <div className="omrBubbles">
                                {question.options.map((option, key) => {
                                    return <div className={question.marked === key ? "markedBubble" : "bubble"} />
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default OmrScreen;