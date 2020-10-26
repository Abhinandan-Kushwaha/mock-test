const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection estbd succsfly");
});
app.get('/', (req, res) => {
    res.send('Hello World! Welcomes here...' + uri)
})

const userRouter = require('./routes/users');
const loginRouter=require('./routes/login');
// const addQuestion = require('./routes/addQuestions');

app.use('/users', userRouter);
app.use('/login',loginRouter);
// app.use('/questions', addQuestion);

const mockTestRouter=require('./routes/mockTest');

app.use('/mockTest',mockTestRouter);



app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
})
