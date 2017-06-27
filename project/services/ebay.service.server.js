var q = require('q');
const app = require('../../express');
const https = require('https');

app.get('/api/project/product/:productId', searchQuery);

var appId   = process.env.EBAY_APP_ID;

function searchQuery(req, res) {
    var productId     = req.params.productId;
    prodSearchQuery(productId)
        .then(function(response){
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function prodSearchQuery(productId) {
    var deferred = q.defer();
    https.get({
        host: 'https://svcs.ebay.com',
        path: '/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0' +
        '&keywords='+product,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "RESPONSE-DATA-FORMAT":"JSON",
            "SECURITY-APPNAME": appId,
            "GLOBAL-ID":"EBAY-US"
        }
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}