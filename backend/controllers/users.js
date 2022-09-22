const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    const{password,...rest} = req.body;
    const user = await User.create({
        ...rest,
        role: 'reviewer',
        passwordDigest: await bcrypt.hash(password, 10)
    })
    console.log(`created user ${user.UserId} your highness`)
    res.json(user)
})


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router