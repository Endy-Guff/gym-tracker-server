import {model, Schema} from "mongoose";


const ExerciseSchema = new Schema({
    name: {type: String, unique: true, required: true},
    group: {type: Schema.Types.ObjectId, ref: 'Group'},
})

export default model('Exercise', ExerciseSchema)