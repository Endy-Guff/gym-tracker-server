import {Request, Response, NextFunction} from 'express'
import GroupService from "../services/group-service";
import {IIterations, IWorkout, IWorkoutExerciseCreateRequest} from "../common/interfaces/workout";
import WorkoutService from "../services/workout-service";

class WorkoutController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const workouts = await WorkoutService.get()
            return res.json(workouts)
        } catch (e) {
            next(e)
        }
    }

    async create(req: Request<void, void, Pick<IWorkout, 'date'>>, res: Response, next: NextFunction) {
        try {
            const {date} = req.body
            const workout = await WorkoutService.create(date)
            return res.json(workout)
        } catch (e) {
            next(e)
        }
    }

    async exerciseCreate(req: Request<{
        id: string
    }, void, IWorkoutExerciseCreateRequest>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const {exerciseId} = req.body
            const workout = await WorkoutService.exerciseCreate(id, exerciseId)
            return res.json(workout)
        } catch (e) {
            next(e)
        }
    }

    async exerciseDelete(req: Request<{
        id: string
        workoutExerciseId: string
    }, void>, res: Response, next: NextFunction) {
        try {
            const {id, workoutExerciseId} = req.params
            const workout = await WorkoutService.exerciseDelete(id, workoutExerciseId)
            return res.json(workout)
        } catch (e) {
            next(e)
        }
    }

    async iterationCreate(req: Request<{
        id: string
        workoutExerciseId: string
    }, Omit<IIterations, '_id'>>, res: Response, next: NextFunction) {
        try {
            const {id, workoutExerciseId} = req.params
            const body = req.body
            const workout = await WorkoutService.iterationCreate(id, workoutExerciseId, body)
            return res.json(workout)
        } catch (e) {
            next(e)
        }
    }

    async iterationUpdate(req: Request<{
        id: string
        workoutExerciseId: string
        iterationId: string
    }, Omit<IIterations, '_id'>>, res: Response, next: NextFunction) {
        try {
            const {id, workoutExerciseId, iterationId} = req.params
            const body = req.body
            const workout = await WorkoutService.iterationUpdate(id, workoutExerciseId, iterationId, body)
            return res.json(workout)
        } catch (e) {
            next(e)
        }

    }

    async iterationDelete(
        req: Request<{
            id: string
            workoutExerciseId: string
            iterationId: string
        }, Omit<IIterations, '_id'>>, res: Response, next: NextFunction
    ) {
        try {
            const {id, workoutExerciseId, iterationId} = req.params
            const workout = await WorkoutService.iterationDelete(id, workoutExerciseId, iterationId)
            return res.json(workout)
        } catch (e) {
            next(e)
        }
    }

    //
    // async update(req: Request<{ id: string }, void, Omit<IGroup, '_id`'>>, res: Response, next: NextFunction) {
    //     try {
    //         const id = req.params.id
    //         const {name} = req.body
    //         const group = await GroupService.update(id, name)
    //         return res.json(group)
    //     } catch (e) {
    //         next(e)
    //     }
    // }
    //
    // async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    //     try {
    //         const id = req.params.id
    //         const group = await GroupService.delete(id)
    //         return res.json(group)
    //     } catch (e) {
    //         next(e)
    //     }
    // }
}

export default new WorkoutController()
