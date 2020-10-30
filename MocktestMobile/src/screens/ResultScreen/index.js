import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import API from '../../utils/API';
import { styles } from './styles';

const ResultScreen = props => {
    const [state, setState] = useState({
        leaderBoardDArray: []
    });


    const userId = useSelector(state => state.user.userId);

    useEffect(() => {
        if (!userId) { //if a user lands directly on test page (by manually entering the url)
            Alert.alert('You are not logged in.')
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
                    Alert.alert('Error loading questions');
                    setState({ ...state, isLoading: false });
                }
            })

    }, []);

    const backPressed = () => {
        props.navigation.navigate('LandingScreen');
    }

    return (
        <View style={styles.resultContainer}>
            <Text
                onClick={backPressed}
                style={styles.backBtn}>
                Back
            </Text>
            <Text style={styles.resultHeader}>
                Leaderboard
            </Text>
            {state.leaderBoardDArray.length ? <View style={styles.resultBox}>
                <View style={styles.resultRow}>
                    <View style={styles.cell}>
                        <Text style={styles.cellHeader}>
                            {"Rank"}
                        </Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.cellHeader}>
                            {"User Id"}
                        </Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.cellHeader}>
                            {"Right"}
                        </Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.cellHeader}>
                            {"Wrong"}
                        </Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.cellHeader}>
                            {"Skipped"}
                        </Text>
                    </View>
                </View>
                {state.leaderBoardDArray.map((doc, key) => {
                    const { right, wrong, skipped } = doc;
                    return (
                        <View style={userId === doc.userId ? styles.resultRowHighlighted : styles.resultRow}>
                            <View style={styles.cell}>
                                <Text>
                                    {key + 1}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text>
                                    {doc.userId}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.cellGreen}>
                                    {right}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.cellRed}>
                                    {wrong}
                                </Text>
                            </View>
                            <View style={styles.cell}>
                                <Text>
                                    {skipped}
                                </Text>
                            </View>
                        </View>
                    )
                })}
            </View>
                :
                <Text style={styles.resultBox}>
                    Loading
                </Text>}
        </View >
    )
}

export default ResultScreen;