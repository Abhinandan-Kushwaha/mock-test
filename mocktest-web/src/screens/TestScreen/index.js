import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import API from '../../utils/API';
import { QuestionCard } from '../../components/QuestionCard';
import { ButtonBar } from '../../components/ButtonBar';
import { useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import Timer from '../../components/Timer';
import HourTimer from '../../components/HourTimer';

const TestScreen = props => {
    const [state, setState] = useState({
        questions: [],
        currentIndex: 0,
        isLoading: true,
        selectedOptionNumber: 0,
        secondsTimer: 3000
    });

    const userId = useSelector(state => state.userId);

    const timerRef = useRef();

    useEffect(() => {
        if (!userId) { //if a user lands directly on test page (by manually entering the url)
            alert('You are not logged in.')
            return;
        }
        API.post('mockTest/', { userId: userId, testId: "test1" })
            .then(res => {
                if (res.status === 200) {
                    setState({ ...state, questions: res.data, isLoading: false });
                }
                else {
                    alert('Error loading questions');
                    setState({ ...state, isLoading: false });
                }
            })

    }, []);

    const onBookmarkPress = () => {
        const { currentIndex } = state;
    }

    const optionPressed = (optionNumber) => {
        setState({ ...state, selectedOptionNumber: optionNumber });
    }

    const onMinuteOver = () => {
        const { currentIndex } = state;
        setState({
            ...state,
            currentIndex: currentIndex + 1,
            selectedOptionNumber: 0,
        });
    }
    const onTimeUp = () => {
        console.log('time up')
    }

    const skipPressed = () => {
        const { currentIndex } = state;
        console.log('timerRef', timerRef);
        timerRef.current.resetTime();
        // timerRef.setSeconds(4);
        setState({
            ...state,
            currentIndex: currentIndex + 1,
            selectedOptionNumber: 0
        });
    }

    const nextPressed = () => {
        const { currentIndex, selectedOptionNumber } = state;
        setState({ ...state, nextLoading: true });

        API.post('mockTest/attempt',
            {
                userId: userId,
                testId: 'test1',
                questionNumber: currentIndex + 1,
                option: selectedOptionNumber
            })
            .then(res => {
                if (res.status === 200) {
                    setState({
                        ...state,
                        nextLoading: false,
                        currentIndex: currentIndex + 1,
                        selectedOptionNumber: 0
                    })
                }
                else {
                    alert('Some problem occurred!')
                    setState({
                        ...state,
                        nextLoading: false,
                    })
                }
            })
    }

    const { isLoading, nextLoading, questions, currentIndex, selectedOptionNumber, secondsTimer } = state;
    return (
        <div className="container">
            {isLoading
                ?
                <div className="loader">Loading</div>
                :
                <div>
                    <div className="topBarContainer">
                        <Timer ref={timerRef} initialMinute={1} onMinuteOver={onMinuteOver} />
                        < Button
                            backgroundColor={"black"}
                            onClick={onBookmarkPress}
                            text={"Bookmark"}
                            icon={faBookmark}
                        />
                        <HourTimer onTimeUp={onTimeUp} />
                    </div>
                    <QuestionCard
                        questionDetails={questions[currentIndex]}
                        selectedOptionNumber={selectedOptionNumber}
                        optionPressed={optionPressed} />
                    {currentIndex !== 179 && <ButtonBar
                        selectedOptionNumber={selectedOptionNumber}
                        nextPressed={nextPressed}
                        skipPressed={skipPressed}
                        nextLoading={nextLoading} />}
                </div>
            }
        </div>
    )
}

export default TestScreen;