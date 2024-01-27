import {Request, Response, NextFunction} from 'express'
import {IGroup} from "../common/interfaces/group";
import ExerciseService from "../services/exercise-service";
import {TExerciseRequest} from "../common/interfaces/exercise";

class ExerciseController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const exercises = await ExerciseService.get()
            return res.json(exercises)
        } catch (e) {
            next(e)
        }
    }

    async create(req: Request<void, void, TExerciseRequest>, res: Response, next: NextFunction) {
        try {
            const {name, groupId} = req.body
            const exercise = await ExerciseService.create(name, groupId)
            return res.json(exercise)
        } catch (e) {
            next(e)
        }
    }

    async update(req: Request<{ id: string }, void, TExerciseRequest>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const values = req.body
            const exercise = await ExerciseService.update(id, values)
            return res.json(exercise)
        } catch (e) {
            next(e)
        }
    }

    async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const group = await ExerciseService.delete(id)
            return res.json(group)
        } catch (e) {
            next(e)
        }
    }
}

export default new ExerciseController()
