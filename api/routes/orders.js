const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order');

router.get('/',(req, res) => {
    // res.status(200).json({
    //     message: 'Orders were fetched'
    // });
    Order.find().exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })



});

router.post('/',(req, res) => {
    // const order = {
    //     productId: req.body.productId,
    //     quantity: req.body.quantity
    // };
    // res.status(201).json({
    //     message: 'Orders were added',
    //     order: order
    // });
    const order = new Order({
        _id: req.body._id,
        name: req.body.name,
        quantity: req.body.quantity
    })

    order.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST request to /orders",
            createdOrder: order
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err  
        })
    });


});

router.get('/:orderId',(req, res)=>{
    const id = req.params.orderId;
    // res.status(200).json({
    //     message: `Order with id: ${id}`
    // });
    Order.findById(id).exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({
                message: `No valid entry point found for order id: ${id}`
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })

});

router.delete('/:orderId',(req, res)=>{
    const id = req.params.orderId
    // res.status(200).json({
    //     message: `Order with id: ${id} is deleted`
    // });
    Order.remove({_id: id})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })


});




module.exports = router;