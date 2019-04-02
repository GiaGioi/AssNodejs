var mongoose = require('mongoose');
//su dung tao template 
var Schema = mongoose.Schema;
var categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: {type:String ,default:null},
    description :{type:String ,default:null}
});
module.exports= mongoose.model('categories',categorySchema);
