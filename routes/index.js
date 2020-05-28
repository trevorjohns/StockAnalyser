var express = require('express');
var router = express.Router();
const request = require('request');

let listOfStocks;
/*
[ {
  "symbol" : "SPY",
  "name" : "SPDR S&P 500",
  "price" : 295.44,
  "exchange" : "NYSE Arca"
}, {
  "symbol" : "CMCSA",
  "name" : "Comcast Corporation Class A Common Stock",
  "price" : 38.74,
  "exchange" : "Nasdaq Global Select"
}
...
*/

/* GET home page. */
router.get('', function(req, res) {
  console.log("getting info");
  
  let url = "https://financialmodelingprep.com/api/v3/stock/list?apikey=b85037103a3f1bd3c34947cd5aef1231"
  request(url, function (err, response, body) {
    if (body !=null){
      //save list here
      listOfStocks = body;
    }else if(err){
      console.log(err);
    }
  });

  res.render('index', { title: 'Stock app', stock: null});
});

router.post('/', function(req, res) {
  let name = req.body;
  //console.log(name);
  
  let url = "https://financialmodelingprep.com/api/v3/quote/"+name.name_field.toUpperCase()+"?apikey=b85037103a3f1bd3c34947cd5aef1231"
  //console.log(url);
  
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {title: 'Stock app', stock: null, error: 'Error, please try again', });
    }else {
      let info = JSON.parse(body)
      //console.log(info);
      
      if(info[0] == undefined){
        res.render('index', {title: 'Stock app', stock: null, error: 'Error, please try again', });
      } else {
        
        res.render('index', {title: 'Stock app', stock: info[0], error : null});
      }
    }
  });
});

const obj = { "name":"John", "age":30, "car":null }

router.get('/stockList', function(req, res) {
    res.send(JSON.stringify(listOfStocks));
});



module.exports = router;
