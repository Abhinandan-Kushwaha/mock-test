import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import API from '../../utils/API';
import './index.css';

const ResultScreen = props => {
    const [state, setState] = useState({
        leaderBoardDArray: []
    });


    const userId = useSelector(state => state.user.userId);

    useEffect(() => {
        if (!userId) { //if a user lands directly on test page (by manually entering the url)
            alert('You are not logged in.')
            return;
        }
        API.post('mockTest/leaderBoard', { testId: "test1" })
            .then(res => {
                console.log('res', res)
                if (res.status === 200) {

                    let leaderBoardDArray = [];
                    res.data.forEach(doc => {
                        const { userId, attempts } = doc;
                        let right = 0;
                        let wrong = 0;
                        attempts.forEach(attemptedDoc => {
                            const { questionNumber, isCorrect } = attemptedDoc;
                            if (isCorrect) {
                                right++;
                            }
                            else {
                                wrong++;
                            }
                        })
                        leaderBoardDArray.push({
                            userId: userId,
                            right: right,
                            wrong: wrong,
                            skipped: 180 - (right + wrong)
                        });
                    })
                    leaderBoardDArray.sort((a, b) => a.right < b.right ? 1 : -1)
                    setState({ ...state, leaderBoardDArray })
                }
                else {
                    alert('Error loading questions');
                    // setState({ ...state, isLoading: false });
                }
            })

    }, []);

    const backPressed = () => {
        props.history.push('/');
    }

    return (
        <div className="resultContainer">
            <div
                onClick={backPressed}
                className="backBtn">
                Back
            </div>
            <div className="resultHeader">
                Leaderboard
            </div>
            {state.leaderBoardDArray.length ? <div className="resultBox">
                <div className="resultRow">
                    <div className="cellHeader">
                        {"User Id"}
                    </div>
                    <div className="cellHeader">
                        {"Right"}
                    </div>
                    <div className="cellHeader">
                        {"Wrong"}
                    </div>
                    <div className="cellHeader">
                        {"Skipped"}
                    </div>
                </div>
                {state.leaderBoardDArray.map((doc, key) => {
                    const { right, wrong, skipped } = doc;
                    return (
                        <div className={userId === doc.userId ? "resultRowHighlighted" : "resultRow"}>
                            <div className="cell">
                                {doc.userId}
                            </div>
                            <div className="cellGreen">
                                {right}
                            </div>
                            <div className="cellRed">
                                {wrong}
                            </div>
                            <div className="cell">
                                {skipped}
                            </div>
                        </div>
                    )
                })}
            </div>
                :
                <div className="resultBox">
                    Loading
                </div>}
        </div >
    )
}

export default ResultScreen;