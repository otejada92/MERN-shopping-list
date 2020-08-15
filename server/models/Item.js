import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const ItemSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

export default model("item", ItemSchema);