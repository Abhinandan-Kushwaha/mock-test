import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import API from '../../utils/API';
import { useDispatch } from 'react-redux';
import { omr, questionSet, bookmarks } from '../../actions';
import { QuestionCard } from '../../components/QuestionCard';
import { ButtonBar } from '../../components/ButtonBar';
import { useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import Timer from '../../components/Timer';
import HourTimer from '../../components/HourTimer';
import OmrScreen from '../OmrScreen';

const TestScreen = props => {
    const [state, setState] = useState({
        questions: [],
        currentIndex: 0,
        isLoading: true,
        omrLoading: false,
        selectedOptionNumber: 0,
        secondsTimer: 3000,
        showOmrSheet: false,
        bookmarkedIndices: []
    });

    const userId = useSelector(state => state.user.userId);

    const timerRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!userId) { //if a user lands directly on test page (by manually entering the url)
            alert('You are not logged in.')
            return;
        }
        API.post('mockTest/', { userId: userId, testId: "test1" })
            .then(res => {
                if (res.status === 200) {
                    setState({ ...state, questions: res.data, isLoading: false });
                    dispatch(questionSet(res.data))
                }
                else {
                    alert('Error loading questions');
                    setState({ ...state, isLoading: false });
                }
            })

    }, []);

    const backPressed = () => {
        setState({ ...state, showOmrSheet: false });
    }

    const onBookmarkPress = () => {
        let { currentIndex, bookmarkedIndices } = state;
        setState({ ...state, bookmarking: true })
        API.post('mockTest/bookmark', { userId: userId, testId: "test1", questionNumber: currentIndex + 1 })
            .then(res => {
                if (res.status === 200) {
                    bookmarkedIndices.push(currentIndex)
                    setState({ ...state, bookmarkedIndices, bookmarking: false })
                }
            })
    }

    const onOMRpress = () => {
        if (state.currentIndex === 0) {
            alert("Please attempt a question first!")
            return;
        }
        setState({ ...state, omrLoading: true });
        API.post('mockTest/omr', { userId: userId, testId: "test1" })
            .then(res => {
                if (res.status === 200) {
                    dispatch(omr(res.data.responses))
                    dispatch(bookmarks(res.data.bookmarkedQuestions || []))
                    setState({ ...state, omrLoading: false, showOmrSheet: true });
                    // props.history.push('/mockTest/omr');
                }
                else {
                    alert('Error loading questions');
                    setState({ ...state, omrLoading: false });
                }
            })
    }

    const optionPressed = (optionNumber) => {
        setState({ ...state, selectedOptionNumber: optionNumber });
    }

    const onMinuteOver = () => {
        const { currentIndex } = state;
        if (currentIndex !== 179) {
            setState({
                ...state,
                currentIndex: currentIndex + 1,
                selectedOptionNumber: 0,
            });
        }
        else {
            props.history.push('/result');
        }
    }
    const onTimeUp = () => {
        props.history.push('/result');
    }

    const skipPressed = () => {
        const { currentIndex } = state;
        // console.log('timerRef', timerRef);
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
                    });
                    timerRef.current.resetTime();
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

    const onSubmitPress = () => {
        if (state.currentIndex === 0) {
            alert("Please attempt a question first!")
            return;
        }
        props.history.push('/result');
    }

    const { isLoading,
        nextLoading,
        questions,
        currentIndex,
        selectedOptionNumber,
        showOmrSheet,
        bookmarkedIndices,
        bookmarking } = state;
    return (
        <div className="container">
            {isLoading
                ?
                <div className="loader">Loading</div>
                :
                <div>
                    <div className="topBarContainer">
                        <Timer ref={timerRef} initialMinute={1} onMinuteOver={onMinuteOver} />
                        <Button
                            backgroundColor={"black"}
                            onClick={onBookmarkPress}
                            text={bookmarking ? "Marking..." : "Bookmark"}
                            icon={bookmarkedIndices.includes(currentIndex) ? faBookmark : null}
                        />
                        <Button
                            backgroundColor={"black"}
                            onClick={onOMRpress}
                            text={"OMR"} />
                        <Button
                            backgroundColor={"red"}
                            text="Submit"
                            onClick={onSubmitPress} />
                        <HourTimer onTimeUp={onTimeUp} />
                    </div>
                    <QuestionCard
                        questionDetails={questions[currentIndex]}
                        selectedOptionNumber={selectedOptionNumber}
                        optionPressed={optionPressed} />
                    {currentIndex !== 179 ? <ButtonBar
                        selectedOptionNumber={selectedOptionNumber}
                        nextPressed={nextPressed}
                        skipPressed={skipPressed}
                        nextLoading={nextLoading} />
                        :
                        <div style={{ marginHorizontal: 30, marginBottom: 30 }}>
                            <Button
                                backgroundColor={selectedOptionNumber === 0 ? "gray" : "green"}
                                text="Submit"
                                onClick={selectedOptionNumber === 0 ? null : onSubmitPress} />
                        </div>}
                </div>
            }
            {showOmrSheet && <div className="omrModal">
                <OmrScreen backPressed={backPressed} />
            </div>}
        </div>
    )
}

export default TestScreen;