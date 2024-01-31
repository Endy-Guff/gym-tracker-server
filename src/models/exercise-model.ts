import {model, Schema} from "mongoose";


const ExerciseSchema = new Schema({
    name: {type: String, unique: true, required: true},
    group: {type: Schema.Types.ObjectId, ref: 'Group'},
})

ExerciseSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toHexString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export default model('Exercise', ExerciseSchema)