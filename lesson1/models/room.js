var mongoose = require('mongoose');
//su dung tao template 
var Schema = mongoose.Schema;
var roomSchema = new Schema({
    room_number: { type: String, required: true,unique:true},
    floor:{type:Number,required:true},
    hotelid:{type:Schema.Types.ObjectId,ref:'hotels'},
    single_room:{type:Boolean,required:true},
    price:{type:Number,required:true},
    status:{type:Number,default:null},
    image: {type:String ,default:null},
    detail :{type:String ,default:null}
});
module.exports= mongoose.model('rooms',roomSchema);
