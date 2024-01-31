import {IExercise} from "./exercise";

export interface IWorkout {
    _id: string
    date: string
    exercises: IWorkoutExercises[]
}

export interface IWorkoutExercises {
    _id: string
    exercise: IExercise
    iterations: IIterations[]
}

export interface IIterations {
    _id: string
    weight: number
    repetitions: number
}

export interface IWorkoutExerciseCreateRequest {
    exerciseId: string
}
