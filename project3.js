var express=require('express');
const app =express();

var mysql=require('mysql');


var connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'userdata'
});

connection.connect(function(err){

    if (err) throw err;
    console.log("connected!");

    var itemName="reebook";
    var price="$199CAD";
   
    var insertCmd="INSERT INTO order_info(itemName,price) values(?,?)";
    var values=[itemName,price]
    connection.query(insertCmd,values,function(err,result){
     if(err) throw err;
     console.log("1 entry recorded!!");




    })
});


var server=app.listen(3019,()=>{
    console.log("server running at http://localhost:3019");


});