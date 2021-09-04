const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.status(200).json({
        message:"Handling GET request to /products"
    });
});

router.post('/',(req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message:"Handling POST request to /products",
        createdProduct: product
    });
});


router.get('/:productId',(req, res) => {
    const id  = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: "this is special product",
            id: id
        });
    }
    else{
        res.status(200).json({
            message: `you passed on id ${id}`
        });
    }
});


router.patch('/:productId',(req, res) => {
    res.status(200).json({
        message: "updated product!"
    });
});

router.delete('/:productId',(req, res) => {
    res.status(200).json({
        message: "deleted product"
    });
});




module.exports = router;