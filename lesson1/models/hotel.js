var mongoose = require('mongoose');
//su dung tao template 
var Schema = mongoose.Schema;

var hotelSchema = new Schema({
    name: { type: String, required: true,unique:true},
    city:{type:String,required:true},
    address:{type:String,default:null},
    owner:{type:String,required:true},
    license_number: { type: Number, required:true},
    total_floor:{type:Number,required:true},
    image: { type: String, default: null },
    
});
module.exports = mongoose.model('hotels', hotelSchema);
