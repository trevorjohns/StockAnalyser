var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Stock app', stock: null});
});

router.post('/', function(req, res) {
  let name = req.body;
  console.log(name);
  
  let url = "https://financialmodelingprep.com/api/v3/quote/"+name.name_field.toUpperCase()+"?apikey=b85037103a3f1bd3c34947cd5aef1231"
  console.log(url);
  
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {title: 'Stock app', stock: null, error: 'Error, please try again', });
    }else {
      let info = JSON.parse(body)
      console.log(info);
      
      if(info[0] == undefined){
        res.render('index', {title: 'Stock app', stock: null, error: 'Error, please try again', });
      } else {
        
        res.render('index', {title: 'Stock app', stock: info[0], error : null});
      }
    }
  });

});

module.exports = router;
