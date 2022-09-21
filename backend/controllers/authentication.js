const router =require('express').Router();
const db= require('../models')
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

const { User } = db;

router.post('/', async (req,res) => {
    const {email, password} = req.body;

    let user = await User.findOne({
        where: { email }
    })
    if (user && await bcrypt.compare(password, user.passwordDigest)){
        const authResult = await jwt.encode(process.env.JWT_SECRET, {id: user.userId});

        res.json({user, token: authResult.value});
    } else {
        res.status(403).json({
            message:'Could not find a user with the provided credentials'
        })
    }
    console.log({id:user.userId, email, password})
})

router.get('/profile', async (req, res) => {
    //console.log(`Session userId: ${req.session.userId}`)
    try{
        const [authenticationMethod,token] =req.headers.authorization.split(' ')
        if (authenticationMethod === 'Beare') {
            const result = await jwt.decode(process.env.JWT_SECRET, token);
            const { id } = result.value;
            let user = await User.findOne({
                where:{
                    userId: id
                }
            });
            res.json(user);
        }

    } catch {
        res.json(null);
    }
});

module.exports = router;