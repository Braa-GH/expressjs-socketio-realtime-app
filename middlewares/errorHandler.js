module.exports = (error, req, res, next) => {
    const { statusCode, message } = error;
    res.status(statusCode).json({status: false, message})
}