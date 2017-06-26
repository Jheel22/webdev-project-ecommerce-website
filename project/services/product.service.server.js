var app = require('../../express');
var productModel = require('../models/product/product.model.server');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });


app.put('/api/project/product/:productId/user/:userId',updateProductLikes);
app.get("/api/project/product/type/:type", findAllProducts);
app.get("/api/project/product/category/:category", findProductsByCategory);
app.get("/api/project/user/:userId/product", findAllProductsForUser);
app.get ('/api/project/product/:productId', findProductById);
app.post('/api/project/user/:userId/product',isRETAILER, createProduct);
app.put ('/api/project/product/:productId',isRETAILER, updateProduct);
app.delete ('/api/project/user/:userId/product/:productId',isRETAILER, deleteProduct);
app.get   ('/api/project/checkRetailer', checkRetailer);
app.post  ("/api/project/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {
    var productId      = req.body.productId;
    var myFile        = req.file;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var savedUrl = '/uploads/'+filename;
    productModel
        .updateProductURL(productId, savedUrl)
        .then(
            function (status) {

                var callbackUrl   = "/index.html#!/product/"+productId;
                res.redirect(callbackUrl);
            }
        );

}



function isRETAILER(req, res,next) {
    if(req.isAuthenticated() && (req.user.role==='RETAILER' || req.user.role==='ADMIN')) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function findAllProductsForUser(req, res) {
    var productname = req.query.productname;
    if(productname) {
        productModel
            .findProductByProductname(productname)
            .then(function (product) {
                if(product) {
                    res.json(product);
                } else {
                    res.sendStatus(404);
                }
            });
    }
    else {
        productModel
            .findAllProductsForUser(req.params.userId)
            .then(function (products) {
                res.json(products);
            })
    }
}
function findAllProducts(req, res) {
        productModel
            .findAllProducts(req.params.type)
            .then(function (products) {
                res.json(products);
            })

}

function findProductsByCategory(req, res) {
    productModel
        .findProductsByCategory(req.params.category)
        .then(function (products) {
            res.json(products);
        })

}

function checkRetailer(req, res) {
    if(req.isAuthenticated() && req.user.role==='RETAILER') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function updateProduct(req, res) {
    var product = req.body;
    productModel
        .updateProduct(req.params.productId, product)
        .then(function (status) {
            res.send(status);
        });
}

function updateProductLikes(req, res) {
    var product = req.body;
    productModel
        .updateProductLikes(req.params.productId, product,req.params.userId)
        .then(function (status) {
            res.send(status);
        });
}

function deleteProduct(req, res) {
    var productId = req.params.productId;
    var userId = req.params.userId;
    productModel
        .deleteProductFromUser(userId, productId)
        .then(function (product) {
            res.json(product);
        });
}
function createProduct(req, res) {
    var product = req.body;
    var userId = req.params.userId;
    productModel
        .createProductForUser(userId, product)
        .then(function (product) {
            res.json(product);
        });
}
function findProductById(req, res) {
    var productId = req.params['productId'];
    productModel
        .findProductById(productId)
        .then(function (product) {
            res.json(product);
        });
}