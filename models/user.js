 const mongoose = require ('mongoose')
 const Schema = mongoose.Schema

 const userSchema= new Schema({
    name:String,
    age:Number ,
    favoriteFoods: [String],
})
module.exports=mongoose.model('user',userSchema)