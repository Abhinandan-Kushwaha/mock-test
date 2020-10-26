const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').post((req, res) => {
    const userId = req.body.userId;
    User.findOne({"userId":userId})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json('err ' + err))
});

module.exports=router;