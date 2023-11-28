const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const productRoute = express.Router();

productRoute.route('/')
    .get(getAll)
    .post(verifyJWT ,create);

productRoute.route('/:id')
    .get(getOne)
    .delete(verifyJWT ,remove)
    .put(verifyJWT, update);

module.exports = productRoute;