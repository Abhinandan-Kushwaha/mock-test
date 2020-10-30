import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from './styles';

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
        <View style={styles.omrContainer}>

            <View style={styles.omrHeader}>
                <TouchableOpacity
                    onPress={props.backPressed}
                    style={styles.backButton}>
                    <Text
                        style={styles.whiteTextStyle}>
                        Back
            </Text>
                </TouchableOpacity>
                <Text style={styles.whiteTextStyle}>
                    Your OMR Sheet
                </Text>
                <Text style={styles.userDetailRow}>
                    Id: <Text style={{ color: 'yellow' }}>{'  ' + userId + '   '}</Text>
                    <Text style={{ marginLeft: 20 }}>Name:
                    <Text style={{ color: 'yellow' }}>{'  ' + userName}</Text>
                    </Text>
                </Text>
            </View>
            <ScrollView style={styles.omrBox}>
                {state.omrQuestionSet.map((question, questionKey) => {
                    return (
                        <View style={styles.omrQuestionRow}>
                            <View style={styles.bookmarkContainer}>
                                {question.bookmarked &&
                                    <Image
                                        source={require('../../assets/bookmark.png')}
                                        style={styles.iconStyle} />
                                }
                            </View>
                            <View style={styles.omrQnumber}>
                                <Text style={styles.backTextStyle}>
                                    {question.questionNumber}
                                </Text>
                            </View>
                            <View style={styles.omrBubbles}>
                                {question.options.map((option, key) => {
                                    return <View style={question.marked === key ? styles.markedBubble : styles.bubble} />
                                })}
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View >
    )
}

export default OmrScreen;