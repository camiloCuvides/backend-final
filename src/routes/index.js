const express = require('express');
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const productRoute = require('./product.route');
const imageRouter = require('./image.route');
const cartRouter = require('./cart.route');
const purchaseRouter = require('./purchase.route');
const router = express.Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRoute);
router.use('/images', imageRouter)
router.use('/cart', cartRouter);
router.use('/purchases', purchaseRouter);


module.exports = router;