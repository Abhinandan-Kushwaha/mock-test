import React from 'react';
import { View, Text } from 'react-native';
import {
    PieChart,
} from "react-native-chart-kit";

const AccuracyGraph = props => {
    let { questionNumber, correctCount, wrongCount } = props;
    correctCount = correctCount || 0;
    wrongCount = wrongCount || 0;
    let chartConfig = {
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    };
    return (
        <View style={{ width: 200 }}>
            <Text>{'Q. ' + questionNumber + '.'}</Text>
            {(correctCount || wrongCount) ?
                <View style={{ marginBottom: 50 }}>
                    <PieChart
                        hasLegend={false}
                        data={[
                            { title: 'One', value: correctCount, color: 'green' },
                            { title: 'Two', value: wrongCount, color: 'red' },
                        ]}
                        width={320}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="value"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: 'green', marginRight: 10 }} />
                        <Text>{Math.round(correctCount * 100 / (correctCount + wrongCount))}%</Text>
                        <View style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: 'red', marginRight: 10, marginLeft: 20 }} />
                        <Text>{Math.round(wrongCount * 100 / (correctCount + wrongCount))}%</Text>
                    </View>
                </View> : <View style={{ marginTop: 5, marginBottom: 35 }}><Text>No one attempted</Text></View>}
        </View>
    )
}
export default AccuracyGraph;