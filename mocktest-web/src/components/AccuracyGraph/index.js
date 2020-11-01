import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const AccuracyGraph = props => {
    let { questionNumber, correctCount, wrongCount } = props;
    correctCount = correctCount || 0;
    wrongCount = wrongCount || 0;
    return (
        <div style={{ width: 200 }}>
            {'Q. ' + questionNumber + '.'}&nbsp;&nbsp;&nbsp;
            {(correctCount || wrongCount) ?
                <div style={{ marginBottom: 50 }}>
                    <PieChart
                        data={[
                            { title: 'One', value: correctCount, color: 'green' },
                            { title: 'Two', value: wrongCount, color: 'red' },
                        ]}
                        lineWidth={60}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10 }}>
                        <div style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: 'green', marginRight: 10 }} />
                        {Math.round(correctCount * 100 / (correctCount + wrongCount))}%
                        <div style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: 'red', marginRight: 10, marginLeft: 20 }} />
                        {Math.round(wrongCount * 100 / (correctCount + wrongCount))}%
                    </div>
                </div> : <div style={{ marginTop: 5, marginBottom: 35 }}>No one attempted</div>}
        </div>
    )
}
export default AccuracyGraph;