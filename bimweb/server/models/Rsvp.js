const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rvspSchema = new Schema({
    userId:{type:String,required:true},
    name:{type:String,required:true},
    eventId:{type:String,required:true},
    attending:{type:Boolean,required:true},
    gusets:Number,
    comments:String,
});

module.exports = mongoose.model('Rsvp',rvspSchema);