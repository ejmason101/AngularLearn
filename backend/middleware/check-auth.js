// check if you have a token

// validate token 
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer a;lksdjf;lkajs;ldkf
        
        // verify token
        jwt.verify(token, "kitt kats make me walk like im listening to bass music bro");
        next(); // let the request continue    
    
    } catch (error) {
        // no token
        // not authenticated
        res.status(401).json(
            { message: "Auth Failed On Request"}
        );
    }
    

}