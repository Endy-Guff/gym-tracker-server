import {model, Schema} from "mongoose";


const GroupSchema = new Schema({
    name: {type: String, unique: true, required: true},
})

GroupSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toHexString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
export default model('Group', GroupSchema)