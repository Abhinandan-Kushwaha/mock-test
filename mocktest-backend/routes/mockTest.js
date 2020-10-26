const router = require('express').Router();
let QuestionSet=require('../models/questionSets.model');

router.route('/').get((req, res) => {
    QuestionSet.find()
        .then(result => {
            
            let parsedResult=JSON.parse(JSON.stringify(result));

            let questionSet=[];
            parsedResult[0].questions.forEach(questionDoc=>{
                const{_id,questionNumber,isImage,imageUrl,text,options}=questionDoc;
                questionSet.push({
                    id:_id,
                    questionNumber:questionNumber,
                    isImage:isImage,
                    imageUrl:imageUrl,
                    text:text,
                    options:options
                });
            });
            res.json(questionSet);
        })
        .catch(err => res.status(400).json('err ' + err))
});

module.exports=router;