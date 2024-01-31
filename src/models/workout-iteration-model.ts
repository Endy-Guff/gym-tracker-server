import {model, Schema} from "mongoose";

export interface IWorkoutIterationSchema {
    weight: number;
    repetitions: number
}

const WorkoutIterationSchema = new Schema<IWorkoutIterationSchema>({
    weight: {type: Number},
    repetitions: {type: Number},
})

WorkoutIterationSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toHexString();
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export default model<IWorkoutIterationSchema>('WorkoutIteration', WorkoutIterationSchema)