import express, {Router} from "express";
import ExerciseController from "../controllers/exercise-controller";

export const exerciseRouter: Router = express.Router()

exerciseRouter.get('/', ExerciseController.get)
exerciseRouter.post('/', ExerciseController.create)
exerciseRouter.patch('/:id', ExerciseController.update)
exerciseRouter.delete('/:id', ExerciseController.delete)

