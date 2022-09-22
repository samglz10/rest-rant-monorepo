const db = require("../models")
const jwt = require('json-web-token')

const { User } = db;

async function defineCurrentUser(req, res, next)
{
    let currentUser;
    try {
        const [method, token] = req.headers.authorization.split(' ');
        if (method ==='Bearer'){
            const result = await jwt.decode(process.env.JWT_SECRET, token);
            const { id } =result.value;
            currentUser = await User.findOne({
                where: {
                    userId: id
                }
            });
            req.currentUser = currentUser;
        } 
    } catch {
        req.currentUser = null;
    }
    next();
}

module.exports = defineCurrentUser;
