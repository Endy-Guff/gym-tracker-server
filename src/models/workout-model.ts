import {model, Schema, Types} from "mongoose";
import {IWorkoutExerciseSchema} from "./workout-exercise-model";

interface IWorkoutSchema {
    date: string;
    workoutExercises: IWorkoutExerciseSchema[]
}

const WorkoutSchema = new Schema<IWorkoutSchema>({
    date: {type: String},
    workoutExercises: [{type: Schema.Types.ObjectId, ref: 'WorkoutExercise'}],
})

WorkoutSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toHexString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export default model<IWorkoutSchema>('Workout', WorkoutSchema)