var app = require('../../express');
var orderModel = require('../models/order/order.model.server');

app.get("/api/project/order", findAllOrders);
app.get("/api/project/user/:userId/order", findOrderForUser);
app.get("/api/project/seller/:userId/order", findOrderForSeller);
app.get ('/api/project/order/:orderId', findOrderById);
app.post('/api/project/user/:userId/order', createOrder);
app.put ('/api/project/product/:productId', updateOrder);
app.delete ('/api/project/user/:userId/order/:orderId', deleteOrder);
app.get   ('/api/project/checkRetailer', checkRetailer);


function isRETAILER(req, res,next) {
    if(req.isAuthenticated() && (req.user.role==='RETAILER' || req.user.role==='ADMIN')) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function findOrderForUser(req, res) {

        orderModel
            .findOrderForUser(req.params.userId)
            .then(function (orders) {
                res.json(orders);
            })

}

function findOrderForSeller(req, res) {

    orderModel
        .findOrderForSeller(req.params.userId)
        .then(function (orders) {
            res.json(orders);
        })

}

function findAllOrders(req, res) {
    orderModel
            .findAllOrders()
            .then(function (orders) {
                res.json(orders);
            })

}


function checkRetailer(req, res) {
    if(req.isAuthenticated() && req.user.role==='RETAILER') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function updateOrder(req, res) {
    var order = req.body;
    orderModel
        .updateOrder(req.params.orderId, order)
        .then(function (status) {
            res.send(status);
        });
}


function deleteOrder(req, res) {
    var orderId = req.params.orderId;
    var userId = req.params.userId;
    orderModel
        .deleteOrder(userId, orderId)
        .then(function (order) {
            res.json(order);
        });
}
function createOrder(req, res) {
    var order = req.body;
    var userId = req.params.userId;
    orderModel
        .createOrder(userId, order)
        .then(function (order) {
            res.json(order);
        });
}
function findOrderById(req, res) {
    var orderId = req.params['orderId'];
    orderModel
        .findOrderById(orderId)
        .then(function (order) {
            res.json(order);
        });
}