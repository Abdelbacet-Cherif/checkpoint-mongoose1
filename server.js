const express= require('express')
const app=express()
const mongoose=require('mongoose')
require ('dotenv').config({path:"config/.env"});
const user=require ('./models/user')

mongoose.connect(process.env.uri,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true},(err)=>{
    err ? console.log (err) : console.log('database is connected')
})
app.use(express.json());

app.listen(7000 ,()=>{
    console.log('connected....' )
}
)
app.post("/user",(req,res)=>{
    const {name,age,favoriteFoods}=req.body
    const newuser=new user ({
        name,
        age, 
        favoriteFoods,

    });
    newuser
    .save()
    .then((data)=>res.status(200).json(data))
    .catch((err)=>res.status(400).json(err));
});

//find search for user
user.find((err,data)=>{
    if (err) throw err ;
    console.log(data)
})

//find one user
user.findOne({favoriteFoods:{$in:['pasta']}})
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))

//find sameone by ID
user.findById('609c9ee03b637d02f4a7a357')
.then((data)=>console.log(data))
.catch((err)=>console.log(err))
//find sameone by id and push other food to the arry 

 user.findOne ({name:'abdelbacet'} ,(err,data)=>{
     if (err){
    console.log(err)}
     else {
         data.favoriteFoods.push('crepe')
         console.log(data)
     }
 })
 //
 user.findOneAndUpdate({name:'brahim'},{age:30},(err,data)=>{
     if (err)
     throw err 
     else {
         console.log(data)
     }
     }
    )

    user.findByIdAndRemove('609c9e181c585938b81df279' ,(err,data)=>{
        if (err)
        throw err
        else {
            console.log(data)
        }
    })

user.findOneAndRemove({name:'Marry'} , (err,data)=>{
    if (err)
    throw err 
    else {
        console.log(data)
    }
})
// chain search Query 
 user.find({favoriteFoods:{$all:['burrits']}})
.select('-age')
.limit(2)
.sort({name:'asc'})
.exec((error,data)=>{
    if (error){
        console.log(data)
    }
})
