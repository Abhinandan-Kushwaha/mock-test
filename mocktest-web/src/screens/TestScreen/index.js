import React from 'react';
import './index.css';
import API from '../../utils/API';
import { QuestionCard } from '../../components/QuestionCard';
import { ButtonBar } from '../../components/ButtonBar';
import { TopBar } from '../../components/TopBar';

export default class TestScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentIndex: 0,
            isLoading: true,
            selectedOptionNumber: 0,
        }
    }

    componentDidMount = () => {
        API.get('mockTest/')
            .then(res => {
                this.setState({ questions: res.data, isLoading: false });
            })

    }

    onBookmarkPress = () => {
        const { currentIndex } = this.state;
    }

    optionPressed = (optionNumber) => {
        this.setState({ selectedOptionNumber: optionNumber });
    }

    nextPressed = () => {
        const { currentIndex } = this.state;
        this.setState({ currentIndex: currentIndex + 1, selectedOptionNumber: 0 })
    }

    render() {
        const { isLoading, questions, currentIndex, selectedOptionNumber } = this.state;
        return (
            <div className="container">
                {isLoading
                    ?
                    <div className="loader">Loading</div>
                    :
                    <div>
                        <TopBar />
                        <QuestionCard
                            questionDetails={questions[currentIndex]}
                            selectedOptionNumber={selectedOptionNumber}
                            optionPressed={this.optionPressed} />
                        <ButtonBar
                            selectedOptionNumber={selectedOptionNumber}
                            nextPressed={this.nextPressed} />
                    </div>
                }
            </div>
        )
    }
}