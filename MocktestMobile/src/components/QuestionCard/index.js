import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from './styles';

export const QuestionCard = (props) => {
    const { questionDetails } = props;
    const { questionNumber, text, isImage, imageUrl } = questionDetails;

    useEffect(() => {
        console.log('questionDetails', questionDetails);
    }, []);

    return (
        <ScrollView style={styles.questionContainer}>
            <View style={styles.questionHeader}>
                <View style={styles.questionNumberContainer}>
                    <Text style={styles.whiteTextStyle}>
                        {questionNumber}
                    </Text>
                </View>

                <View style={styles.questionTextContainer}>
                    <Text style={styles.blackTextStyle}>
                        {text}
                    </Text>
                </View>
            </View>
            {isImage
                &&
                <View style={styles.questionImageContainer}>
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.questionImage} />
                </View>
            }
            {renderOptions(props)}
        </ScrollView >
    )
}
const renderOptions = (props) => {
    const { questionDetails, selectedOptionNumber, optionPressed } = props;
    const { options } = questionDetails;
    return (
        <View style={styles.optionsContainer}>
            {options.map((option, key) => {
                const { optionNumber, text, isImage, imageUrl } = option;
                return (
                    <View style={styles.optionsRow}>
                        <TouchableOpacity style={
                            optionNumber === selectedOptionNumber
                                ? styles.selectedOptionCircle
                                : styles.optionCircle}

                            onPress={() => optionPressed(optionNumber)} />

                        {isImage
                            ?
                            <View style={styles.optionImageContainer}>
                                <Image
                                    source={{ uri: imageUrl }}
                                    style={styles.optionImage} />
                            </View>
                            :
                            <TouchableOpacity style={styles.optionTextContainer}>
                                <Text style={styles.blackTextStyle}>
                                    {text}
                                </Text>
                            </TouchableOpacity>}
                    </View>
                )
            })}
        </View>
    )
}