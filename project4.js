var express=require('express');
const app =express();

var mysql=require('mysql');
var bodyparser = require('body-parser');


var connection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'userdata'
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.post('/register/',(req,res,next)=>{
    var data =req.body;
    var password=data.password;
    var email=data.email;
    var user = data.user;
    var phonenumber = data.phonenumber;
    var DOB = data.DOB;
    console.log(email+""+password);
    connection.query("SELECT *FROM login_info WHERE email=?",[email],function(err,result,fields){
        connection.on('error',(err)=>{
            console.log("[MYSQL ERROR]",err);

        });
        if(result && result.length){
            res.json("user already exists");
        }
        else{
            var insert_cmd ="INSERT INTO login_info(user,email,password,phonenumber,DOB) values(?,?,?,?,?)";
            values=[user,email,password,phonenumber,DOB];
            console.log("executing: "+insert_cmd);
            connection.query(insert_cmd,values,(err,results,fields)=>{
              connection.on('error',(err)=>{
                  console.log('[MYSQL ERROR]',err);
              });
              res.json("Registered!"); 
              console.log("registration successful");

            });
        }
 });
});
     app.post("/login/",(req,res,next)=>{
        var data =req.body;

        var email=data.email;
        var password=data.password;

        connection.query("SELECT * FROM login_info WHERE email = ?",[email],(err,result,fields)=>{
            connection.on('error',(err)=>{
            console.log("[MYSQL ERROR]",err);

        });
        if(result && result.length){
            console.log(result);

            if (password == result[0].password){
                res.json("user logged in");
                res.end;

            }else{
                res.json("wrong password");
                res.end;
            }
        }
        else{
            res.json("user not found");
            res.end;

        }
    });

     });


var server =app.listen(3017,()=>{
         console.log("server running at http://localhost:3017");


});















