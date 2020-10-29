const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionsSchema = new Schema({
    optionNumber: { type: Number },
    isImage: { type: Boolean },
    imageUrl: { type: String },
    text: { type: String },
})

const questionSchema = new Schema({
    questionNumber: { type: Number },
    isImage: { type: Boolean },
    imageUrl: { type: String },
    text: { type: String },
    options: [optionsSchema],
    answer: { type: Number }
});

const questionSetSchema = new Schema({
    questions: [questionSchema]
})

const QuestionSet = mongoose.model('QuestionSets', questionSetSchema);
module.exports = QuestionSet;