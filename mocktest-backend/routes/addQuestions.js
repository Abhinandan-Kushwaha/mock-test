const router = require('express').Router();
let QuestionSet = require('../models/questionSets.model');

router.route('/addQuestion').get((req, res) => {
    let i = 0;
    let questions = [];
    for (i = 0; i < 10; i++) {
        let qNo = i + 1;
        questions.push({
            questionNumber: qNo,
            isImage: false,
            imageUrl: '',
            text: 'This is your question number ' + qNo,
            options: [{
                optionNumber: 1,
                isImage: false,
                imageUrl: '',
                text: 'This is option 1'
            },
            {
                optionNumber: 2,
                isImage: false,
                imageUrl: '',
                text: 'This is option 2'
            },
            {
                optionNumber: 3,
                isImage: false,
                imageUrl: '',
                text: 'This is option 3'
            },
            {
                optionNumber: 4,
                isImage: false,
                imageUrl: '',
                text: 'This is option 4'
            }
            ],
            answer: parseInt(Math.floor(Math.random() * 5).toString())
        });
    }
    const newQuestionSet = new QuestionSet({ questions: questions });
    newQuestionSet.save()
        .then(() => res.json('QuestionSet added ' + questions))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;