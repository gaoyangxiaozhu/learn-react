
// 设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var path = require('path');
var compression = require('compression');
var config = require('./config');

var app = express();

app.use(compression());

// serve our static stuff like index.css
app.use(express.static(config.static));

// send all requests to index.html so browserHistory works


app.get('/api/listCamera', function(req, res){
    //测试数据
    var years = [{ 'id' : '0', 'year' : '2015' },
                 { 'id' : '1', 'year' : '2016' },
                 { 'id' : '2', 'year' : '2017' }
                ];
    res.send(years);
});

app.get('/api/years/', function(req, res){

    var months = [{ 'id': '0', 'month' : '1' },
                  { 'id': '1', 'month' : '2' },
                  { 'id': '2', 'month' : '3' },
                  { 'id': '3', 'month' : '4' }

    ];
    res.send(months);
})

var PORT = process.env.PORT || 8000
app.listen(PORT, function() {
  console.log('Development Express server running at localhost:' + PORT)
});
