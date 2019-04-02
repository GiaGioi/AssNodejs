var mongoose = require('mongoose');
//su dung tao template 
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: {type:String ,default:null},
    description :{type:String ,default:null},
    price:{type:String,required:true,unique:true}
});
module.exports= mongoose.model('products',productSchema);
