var mongoose = require('mongoose');
var orderSchema = require('./order.schema.server');
var orderModel = mongoose.model('OrderModel', orderSchema);
var userModel = require('../user/user.model.server');
var productModel = require('../product/product.model.server');

orderModel.findAllOrders = findAllOrders;
orderModel.createOrder = createOrder;
orderModel.findOrderForUser = findOrderForUser;
orderModel.deleteOrder = deleteOrder;
orderModel.findOrderById = findOrderById;
orderModel.updateOrder = updateOrder;
orderModel.findOrderForSeller=findOrderForSeller;
module.exports = orderModel;



function findOrderById(orderId) {
    return orderModel.findById(orderId);
}

function updateOrder(orderId, newOrder) {
  delete newOrder._user;
  delete newOrder._product;
  delete newOrder.dateCreated;
    return orderModel
        .update({_id: orderId}, {$set: newOrder});
}

function deleteOrder(userId, orderId) {
    return orderModel
        .remove({_id: orderId})
        .then(function (status) {
            return userModel
                .deleteOrder(userId, orderId);
        });
}

function findOrderForUser(userId) {
    return orderModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findOrderForSeller(userId) {
    return orderModel
        .find({sellername: userId})
        .populate('sellername')
        .exec();
}

function findAllOrders() {
    return orderModel.find();
}


function createOrder(userId, order) {
    delete order._id;
    return orderModel
        .create(order)
        .then(function (order) {
            return userModel
                .addOrder(userId, order._id)
        })
}

