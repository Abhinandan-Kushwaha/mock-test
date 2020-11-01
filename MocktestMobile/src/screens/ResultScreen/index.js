import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import API from '../../utils/API';
import { styles } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Button';
import AccuracyGraph from '../../components/AccuracyGraph';

const ResultScreen = props => {
    const [state, setState] = useState({
        leaderBoardDArray: [],
        tabSelected: 'leaderboard'
    });


    const userId = useSelector(state => state.user.userId);
    let questions = useSelector(state => state.test.questions);

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
                                questions[questionNumber - 1].correctCount =
                                    questions[questionNumber - 1].correctCount ?
                                        questions[questionNumber - 1].correctCount + 1 : 1;
                                right++;
                            }
                            else {
                                wrong++;
                                questions[questionNumber - 1].wrongCount =
                                    questions[questionNumber - 1].wrongCount ?
                                        questions[questionNumber - 1].wrongCount + 1 : 1;
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
                    let index;
                    for (index = 0; index < leaderBoardDArray.length; index++) {
                        leaderBoardDArray[index].rank = index + 1;
                    }
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
            {state.leaderBoardDArray.length ?
                <View style={styles.resultBox}>
                    <View style={styles.resultHeader}>
                        <Button
                            text="Leaderboard"
                            onClick={() => setState({ ...state, tabSelected: 'leaderboard' })}
                            backgroundColor={state.tabSelected === 'leaderboard' ? 'black' : 'rgb(98, 123, 155)'} />
                        <Button
                            text="Accuracy Graph"
                            onClick={() => setState({ ...state, tabSelected: 'accuracy' })}
                            backgroundColor={state.tabSelected === 'accuracy' ? 'black' : 'rgb(98, 123, 155)'} />
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Button
                            text={"Exit"}
                            backgroundColor="black"
                            onClick={() => props.navigation.navigate('LandingScreen')} />
                    </View>
                    {state.tabSelected === 'leaderboard' ?
                        <View>
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
                            <FlatList
                                data={state.leaderBoardDArray}
                                bounces={false}
                                keyExtractor={(item, index) => item.key}
                                renderItem={({ item, key }) => {
                                    const { rank, right, wrong, skipped } = item;
                                    return (
                                        <View style={userId === item.userId ? styles.resultRowHighlighted : styles.resultRow}>
                                            <View style={styles.cell}>
                                                <Text>
                                                    {rank}
                                                </Text>
                                            </View>
                                            <View style={styles.cell}>
                                                <Text>
                                                    {item.userId}
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
                                }} />
                        </View>
                        :
                        <View>
                            <Text>Below is the percentage of users giving correct and wrong answers to each question</Text>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={questions}
                                renderItem={(question => {
                                    const { questionNumber, correctCount, wrongCount } = question.item;

                                    return (
                                        <View style={styles.pie}>
                                            <AccuracyGraph
                                                questionNumber={questionNumber}
                                                correctCount={correctCount}
                                                wrongCount={wrongCount} />
                                        </View>)
                                })} />
                        </View>
                    }
                </View>
                :
                <View style={styles.resultBox}>
                    <Text>Loading</Text>
                </View>}
        </View >
    )
}

export default ResultScreen;