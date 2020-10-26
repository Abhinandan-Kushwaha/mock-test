const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('err ' + err))
});

router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const userId = req.body.userId;
    const newUser = new User({ userName: userName,userId:userId });

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error' + err))
});

module.exports = router;