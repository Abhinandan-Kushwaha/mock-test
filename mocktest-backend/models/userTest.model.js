const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    questionNumber: { type: Number, required: true },
    option: { type: Number, required: true },
})

const userTestSchema = new Schema({
    userId: { type: String, required: true, trim: true },
    testId: { type: String, required: true, trim: true },
    responses: [responseSchema],
    bookmarkedQuestions: { type: Array }
});

const UserTest = mongoose.model('UserTest', userTestSchema);
module.exports = UserTest;