const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require("../models/product");



router.get('/',(req, res) => {
    // res.status(200).json({
    //     message:"Handling GET request to /products"
    // });
    Product.find().exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    })
});

router.post('/',(req, res) => {
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:"Handling POST request to /products",
            createdProduct: product
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

    // res.status(201).json({
    //     message:"Handling POST request to /products",
    //     createdProduct: product
    // });
});


router.get('/:productId',(req, res) => {
    const id  = req.params.productId;
    // if(id === 'special'){
    //     res.status(200).json({
    //         message: "this is special product",
    //         id: id
    //     });
    // }
    // else{
    //     res.status(200).json({
    //         message: `you passed on id ${id}`
    //     });
    // }
    Product.findById(id).exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({
                message: "No valid entry point found for provided id: ${id}"
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


router.patch('/:productId',(req, res) => {
    // res.status(200).json({
    //     message: "updated product!"
    // });
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, {
        $set: updateOps,
    })
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })

});

router.delete('/:productId',(req, res) => {
    // res.status(200).json({
    //     message: "deleted product"
    // });
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err});
    });
});




module.exports = router;