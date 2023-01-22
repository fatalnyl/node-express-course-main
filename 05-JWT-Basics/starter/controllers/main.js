const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors/')


const login = async (req,res) => {
    const {username, password} = req.body
    console.log(username, password)
    
    // for demo, id is dy provided by DB
    if (!username || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const id = new Date().getDate()
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})
    
    res.status(200).json({msg:'user created', token})
}

const dashboard = async (req,res) => {
    // as authentication function can be used in multiple routes, so put in middleware..
    
    // console.log(req.user)
    
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, ${req.user.username}`, secret:`Here is your authroization data, your lucky number is ${luckyNumber}`})
}

module.exports = {login, dashboard}