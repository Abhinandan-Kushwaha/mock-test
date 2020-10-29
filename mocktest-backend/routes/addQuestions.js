const router = require('express').Router();
let QuestionSet = require('../models/questionSets.model');

router.route('/addQuestion').get((req, res) => {
    let i = 0;
    let questions = [];
    let qUrl = 'https://dru69sbqnarp.cloudfront.net/imgs/Biology/600x300/food_web.png';
    let qUrl2 = 'https://drive.google.com/file/d/1Z8pbAaVb01nLJ1_2I2y247exg5krZuMH/view?usp=sharing';

    let questionTexts = ['In which of the following light produces image focus in front of the retina?',
        'In the diagram below which is a decomposer?',
        'Daltonism is the name referred to which of the following disorders as this name was kept in honour of John Dalton , the father of atomic theory?',
        'The images below show a partial food chain. Which organism would most likely come after the snake in the food chain?',
        'What is the main function of Lymphocytes?',
        'Normal Human blood pressure is',
        'Who among the following is considered to be the father of antiseptic surgery?',
        'A goitre is also called as?',
        'Which among the following has the highest content of Vitamin E of any food that has not undergone prior preparation or vitamin fortification?',
        'Which among the following causes Hydrophobia?',
        'MON 863 is a genetically engineered variety of which among the following?',
        'Which among the following is different from other three?'
    ];

    let options = [
        ["Presbyopia",
            "Myopia",
            "Hyperopia",
            "Hypermetropia",
            "Hypertropia",],

        ["bird",
            "snake",
            "grass",
            "mushroom"],

        ["Deafness",
            "Color Blindness",
            "Night Blindness",
            "Astigmatism",],

        ["https://dru69sbqnarp.cloudfront.net/imgs/Biology/200x200/pictograph_larva.png",
            "https://dru69sbqnarp.cloudfront.net/imgs/Biology/200x200/pictograph_eagle.png",
            "https://dru69sbqnarp.cloudfront.net/imgs/Biology/200x200/pictograph_mice.png",
            "None of the above",],

        ["Production of Antibodies",
            "Production of Antigens",
            "Production of White Blood Cells",
            "All of the above",],

        ["110/110",
            "120/70",
            "120/80",
            "140/60",],

        ["Dr. Lineus Pauling",
            "Dr. Joseph Lister",
            "Robert Koch",
            "Louis pasteur",],

        ["Bronchocele",
            "Larynx",
            "autoimmune disease",
            "inflammation",],

        ["Wheat germ oil",
            "Rice germ oil",
            "Oat bran oil",
            "Sunflower oil",],

        ["Virus",
            "Bacteria",
            "Protozoan",
            "worm",],

        ["Soya Bean",
            "Maize",
            "Rice",
            "Tomato",],

        ["Fish",
            "Crab",
            "Prawn",
            "Snail"]
    ];

    let answers = [2, 4, 2, 2, 1, 3, 2, 1, 1, 1, 2, 1];
    let qNo = 0;
    for (j = 0; j < 15; j++) {
        for (i = 0; i < 12; i++) {
            qNo++;
            let myOptions = [{
                optionNumber: 1,
                isImage: i === 3 ? true : false,
                imageUrl: i === 3 ? options[3][0] : '',
                text: i === 3 ? '' : options[i][0]
            },
            {
                optionNumber: 2,
                isImage: i === 3 ? true : false,
                imageUrl: i === 3 ? options[3][1] : '',
                text: i === 3 ? '' : options[i][1]
            },
            {
                optionNumber: 3,
                isImage: i === 3 ? true : false,
                imageUrl: i === 3 ? options[3][2] : '',
                text: i === 3 ? '' : options[i][2]
            },
            {
                optionNumber: 4,
                isImage: false,
                imageUrl: '',
                text: options[i][3]
            },
            ];
            if (i === 0) {
                myOptions.push({
                    optionNumber: 5,
                    isImage: false,
                    imageUrl: '',
                    text: options[i][4]
                })
            }
            questions.push({
                questionNumber: qNo,
                isImage: i === 1 || i === 3 ? true : false,
                imageUrl: i === 1 ? qUrl : i === 3 ? qUrl2 : '',
                text: questionTexts[i],
                options: myOptions,
                answer: answers[i]
            });
        }
    }
    const newQuestionSet = new QuestionSet({ questions: questions });
    newQuestionSet.save()
        .then(() => res.json('QuestionSet added ' + questions))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;