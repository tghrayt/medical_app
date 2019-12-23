let express = require('express');
let bodyParser= require('body-parser');
let morgan =require('morgan');
let pg = require('pg');
const PORT =3000;
let app = express();

let pool = new pg.Pool({
host:'localhost',
user:'postgres',
port: 5432,
password:'ysf',
database:'medicale', 
max:10   //nbr des connexion posssible
});





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use(morgan('dev'));


app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });






 app.post('/node_medical/new-medecin', function(request,response) {
var medecin_name= request.body.medecin_name;


pool.connect((err,db,done) =>{
 
 if(err){
     return response.status('404').send(err);
 }else{
     
    db.query('insert into  medecin (name) values ($1)',[medecin_name],(err,table)=>{
        
   if(err){
           return response.status('404').send(err);
        }else{
            console.log(table.rows);
            db.end();
            response.status('201').send({message:'data inserted !!'});
          
   }
  })
}
});
 });





  app.listen(PORT ,()=>{
      console.log('listening to port'+PORT)
  });