import {model, Schema, Types} from "mongoose";
import {IWorkoutIterationSchema} from "./workout-iteration-model";

export interface IWorkoutExerciseSchema {
    exercise: Types.ObjectId
    iterations: IWorkoutIterationSchema[]
}

const WorkoutExerciseSchema = new Schema<IWorkoutExerciseSchema>({
    exercise: {type: Schema.Types.ObjectId, ref: 'Exercise'},
    iterations: [{type: Schema.Types.ObjectId, ref: 'WorkoutIteration'}],
})

WorkoutExerciseSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toHexString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export default model<IWorkoutExerciseSchema>('WorkoutExercise', WorkoutExerciseSchema)