const express = require('express');
const app = express();
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



//routes and their specific actions
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
// connecting with mongoose
mongoose.connect('mongodb://localhost:27017/restapi_db');




app.use(morgan('dev')); //logging our actions
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); 
//for checking headers.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //browsers send options request first in post and patch requests.
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 
            "PUT, POST, DELETE, PATCH, GET"
        );
        return res.status(200).json({});
    }
    next();
});



//connecting headers with their respective api routes.
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//catching errors that have above routes
 app.use((req, res, next) => {
     const error = new Error('Not Found');
     error.status = 404;
     next(error);
 })

 //in case in future if we face any errors within our application
 app.use((error, req, res, next) => {
     //for errors like of database etc.
     res.status(error.status || 500);
     res.json({
         error:{
             message:error.message
         }
     });
 });


module.exports = app;