import express, {Router} from "express";
import WorkoutController from "../controllers/workout-controller";

export const workoutRouter: Router = express.Router()

workoutRouter.get('/', WorkoutController.get)
workoutRouter.post('/', WorkoutController.create)
workoutRouter.post('/:id/exercise', WorkoutController.exerciseCreate)
workoutRouter.delete('/:id/exercise/:workoutExerciseId', WorkoutController.exerciseDelete)
workoutRouter.post('/:id/exercise/:workoutExerciseId/iteration', WorkoutController.iterationCreate)
workoutRouter.patch('/:id/exercise/:workoutExerciseId/iteration/:iterationId', WorkoutController.iterationUpdate)
workoutRouter.delete('/:id/exercise/:workoutExerciseId/iteration/:iterationId', WorkoutController.iterationDelete)
// workoutRouter.patch('/:id', WorkoutController.update)
// workoutRouter.delete('/:id', WorkoutController.delete)

