let express = require('express');
let router = express.Router();
let words = require('random-words');
let math = require('mathjs');
let db = require('../db');


router.get('/number', (req, res) => {
    res.satus(200).json('' + math.floor(math.random() * 100))
});

router.get('/word', (req, res) => {
    res.status(200).json(words())
});

router.post('/word', (req, res) => {
    let word = {
        userId: req.body.userId,
        word: req.body.word
    }
    db.words.create(word)
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json({Error: err, message: "WTF"}))
})

module.exports = router;