const router = require('express').Router();
let QuestionSet = require('../models/questionSets.model');
let userTest = require('../models/userTest.model');

router.route('/').post((req, res) => {
    const { userId, testId } = req.body;
    userTest.deleteOne({ "userId": userId, "testId": testId })
        .then(res => console.log('delete res', res))
        .catch(err => console.log('delete errr', err));

    QuestionSet.find()
        .then(result => {

            let parsedResult = JSON.parse(JSON.stringify(result));

            let questionSet = [];
            parsedResult[0].questions.forEach(questionDoc => {
                const { _id, questionNumber, isImage, imageUrl, text, options } = questionDoc;
                questionSet.push({
                    id: _id,
                    questionNumber: questionNumber,
                    isImage: isImage,
                    imageUrl: imageUrl,
                    text: text,
                    options: options
                });
            });
            res.json(questionSet);
        })
        .catch(err => res.status(400).json('err ' + err))
});

router.route('/attempt').post((req, res) => {
    const { userId, testId, questionNumber, option } = req.body;

    const userResponse = {
        questionNumber: questionNumber,
        option: option
    }

    userTest.update(
        { userId: userId, testId: testId },
        {
            $push: {
                responses: userResponse
            }
        },
        { upsert: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json('error ' + err));
});


router.route('/bookmark').post((req, res) => {
    const { userId, testId, questionNumber } = req.body;

    userTest.update(
        { userId: userId, testId: testId },
        {
            $push: {
                bookmarkedQuestions: questionNumber
            }
        },
        { upsert: true })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json('error ' + err));
});

router.route('/omr').post((req, res) => {
    const { userId, testId } = req.body;

    userTest.findOne({ userId: userId, testId: testId })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json('error ' + err));
});

module.exports = router;