const request = require('request');
const base64 = require('js-base64').Base64;
const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
	res.render('github');
});

router.get('/:user', (req, res) => {
	var user = req.params.user, repo = req.params.repo;
	request.get({
		  uri: 'https://api.github.com/users/' + user + '/repos',
   		headers: { 
      		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
   		},
   		method: 'GET'
  	},
  	function (error, response, body) {
  		if(error) {
  			console.log(error);
  		} else {
        var data = JSON.parse(body);
        var response = [];
        for(x in data) {
          response.push(JSON.parse("{\"name\": \"" + data[x].name + "\", \"url\": \"" + data[x].url + "\", \"type\": \"repo\"}"));
        }
        res.send(response);
 		 }
	});
});

router.post('/type', (req, res) => {
  console.log(req);
  console.log(req.body);
  var urla = req.body.urla;
  var type = req.body.type;


  urla = 'https://api.github.com/repos/pranavtharoor/CPP';  //remove
  type = 'repo';                                            //remove


  if(type == 'repo')
    urla = urla + '/contents';

  request.get({
      uri: urla,
      headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
      },
      method: 'GET'
    },
    function (error, response, body) {
      if(error) {
        console.log(error);
      } else {

        if(type == 'file') {
          var buf = new Buffer(JSON.parse(body).content, 'base64').toString('ascii');
          console.log(buf);
          res.send(buf);
        } else {
            var response = [];
            var data = JSON.parse(body);
            for(x in data) {
              var temp = {
                "name": data[x].name,
                "url": data[x].url,
                "type": data[x].type
              }
              response.push(temp);
            }
          res.send(response);
        }
      }
  });
});

module.exports = router;