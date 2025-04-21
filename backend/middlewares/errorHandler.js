
const errorHandler = (err, req, res, next) => {
   console.log(err);
   const status = res.statusCode !== 200 ? res.statusCode : 500;
   return res.status(status).json({
    success:false,
    message:err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
   })
}

module.exports = errorHandler;
