const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/',(req, res) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Orders were added',
        order: order
    });
});

router.get('/:orderId',(req, res)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message: `Order with id: ${id}`
    });
});

router.delete('/:orderId',(req, res)=>{
    const id = req.params.orderId
    res.status(200).json({
        message: `Order with id: ${id} is deleted`
    });
});




module.exports = router;