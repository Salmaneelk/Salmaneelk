const User = require('../models/user');
const Product = require('../models/product');


exports.addItem = (req, res, next) => {
    const us = JSON.parse(req.get('User'));
    const user = User.get(us.username, us.password);
    res.status(200).json(user.addNewItem(req.body.id, req.body.name, req.body.price));
}

exports.increaseQuantity = (req, res, next) => {
    const us = JSON.parse(req.get('User'));
    const user = User.get(us.username, us.password);
    const item = user.increaseQuantity(req.params.id);
    res.status(200).json(item);
}

exports.decreaseQuantity = (req, res, next) => {
    const us = JSON.parse(req.get('User'));
    const user = User.get(us.username, us.password);
    const item = user.decreaseQuantity(req.params.id);
    res.status(200).json(item);

}

exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.placeOrder = (req, res, next) => {
    const items = JSON.parse(req.body.cart);
    items.forEach(item => {
        Product.checkEnoughStock(item.id, item.quantity);
    });
    const us = JSON.parse(req.get('User'));
    const user = User.get(us.username, us.password);
    user.cart=[];
    console.log(user);
    res.status(200).json(user.cart);
}
