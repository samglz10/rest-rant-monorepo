const router =require('express').Router();
const db= require('../models')
const bcrypt = require('bcrypt')

const { User } = db;

router.post('/', async (req,res) => {
    const {email, password} = req.body;

    let user = await User.findOne({
        where: { email }
    })
    if (user && await bcrypt.compare(password, user.passwordDigest)){
        req.session.userId;
        res.json({user});
    } else {
        res.status(403).json({
            message:'Could not find a user with the provided credentials'
        })
    }
    console.log({id:user.userId, email, password})
})

router.get('/profile', async (req, res) => {
    console.log(`Session userId: ${req.session.userId}`)
    try{
        let user = await User.findOne({
            where:{
                userId: req.session.userId
            }
        });
        res.json(user);
    } catch {
        res.json(null);
    }
});

module.exports = router;