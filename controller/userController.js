const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db')
const Op = db.sequelize.Op

router.post('/signup', (req, res) => {
    if (req.body.email) {
        console.log('email')
        let user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        db.users.create(user)
            .then(
                createSuccess = (user) => {
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                    console.log(token)
                    res.status(200).json({
                        user: user,
                        message: 'user created',
                        sessionToken: token
                    })
                },
                createError = err => res.send(500, err)
            )
    } else {
        console.log('no email')
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        db.users.create(user)
            .then(
                createSuccess = (user) => {
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                    res.status(200).json({
                        user: user,
                        message: 'user created',
                        sessionToken: token
                    })
                },
                createError = err => res.send(500, err)
            )
    }
})

router.post('/signin', (req, res) => {
    db.users.findOne({
        where: {
            [Op.or]: [{ email: email }, { username: username }]
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                        res.json({
                            user: user,
                            message: 'successfully authenticated user',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({ error: 'bad gateway' })
                    }
                })
            } else {
                res.status(500).send({ error: 'failed to authenticate' })
            }
        }, err => res.status(501).send({ error: 'failed to process' }))
})

router.get('/users', (req, res) => {
    db.users.findAll({
        include: [{
            model: db.words
        }]
    })
        .then(users => {
            const resObj = users.map(user => {
                return Object.assign(
                    {},
                    {
                        userId: user.id,
                        username: user.username,
                        email: user.email,
                        words: user.words.map(word => {
                            return Object.assign(
                                {},
                                {
                                    word: word.word,
                                    wordOwner: word.userId
                                }
                            )
                        })
                    }
                )
            });
            res.json(resObj)
        })
})

module.exports = router
