const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id;
    const results = await Purchase.findAll({ where: { userId: userId }, 
        include: [{
            model: Product,
            include: [Image]
    }]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const productCart = await Cart.findAll({where: {userId: userId}, 
        include: [{ model: Product}]
    })
    const result = await Purchase.bulkCreate(productCart.map(product => {
        const { quantity, productId, userId } = product;
        return { quantity, productId, userId }
    }));
    await Cart.destroy({ where: {userId: req.user.id}
    })
    return res.status(201).json(result);
});


module.exports = {
    getAll,
    create,
}