const authorize = (req, res, next) => {
    const { user } = req.query;
    if (user === 'john') {
        req.user = { name: 'john', id: 3 };
        next(); // if user is john, go to the next middleware
    } else {
        res.status(401).send('Unauthorized'); // if user is not john, send 401 status
    }
    console.log('authorize');
    next();
};

module.exports = authorize;