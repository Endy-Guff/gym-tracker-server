import ApiError from "../exceptions/api-error";
import WorkoutModel from "../models/workout-model";
import {Types} from "mongoose";
import WorkoutExerciseModel from "../models/workout-exercise-model";
import WorkoutIterationModel from "../models/workout-iteration-model";
import {IIterations} from "../common/interfaces/workout";
import GroupModel from "../models/group-model";

class WorkoutService {

    async get() {
        return WorkoutModel.find({}).populate({
            path: 'workoutExercises',
            populate: [{
                path: 'iterations',
            }, {
                path: 'exercise',
                populate: {
                    path: 'group'
                }
            }]
        })
    }

    async create(date: string) {
        const candidate = await WorkoutModel.findOne({date})
        if (candidate) {
            throw ApiError.BadRequest(`Тренировка на дату ${date} уже существует`)
        }

        return await WorkoutModel.create({date})
    }

    async exerciseCreate(workoutId: string, exerciseId: string) {
        const candidate = await WorkoutModel.findById(workoutId)
        if (!candidate) {
            throw ApiError.BadRequest(`Тренировка не найдена`)
        }
        const workoutExercises = candidate.workoutExercises;
        let workoutExerciseExists = false;

        for (const item of workoutExercises) {
            const workoutExercise = await WorkoutExerciseModel.findById(item);
            if (workoutExercise?.exercise?.toString() === exerciseId.toString()) {
                workoutExerciseExists = true;
                break;
            }
        }

        if (workoutExerciseExists) {
            throw ApiError.BadRequest('Упражнение уже сущетсвует в этой тренировке');
        }

        const workoutExercise = await WorkoutExerciseModel.create({exercise: exerciseId})

        return WorkoutModel.findOneAndUpdate(
            {_id: candidate.id},
            {$addToSet: {workoutExercises: workoutExercise.id}},
            {new: true}
        ).populate({
            path: 'workoutExercises',
            populate: [{
                path: 'iterations',
            }, {
                path: 'exercise',
                populate: {
                    path: 'group'
                }
            }]
        });
    }

    async exerciseDelete(workoutId: string, workoutExerciseId: string) {
        const candidate = await WorkoutModel.findById(workoutId)
        if (!candidate) {
            throw ApiError.BadRequest(`Тренировка не найдена`)
        }

        await WorkoutExerciseModel.findByIdAndDelete(workoutExerciseId)

        return WorkoutModel.findOneAndUpdate(
            {_id: candidate.id},
            {$pull: {workoutExercises: workoutExerciseId}},
            {new: true}
        ).populate({
            path: 'workoutExercises',
            populate: [{
                path: 'iterations',
            }, {
                path: 'exercise',
                populate: {
                    path: 'group'
                }
            }]
        });
    }

    async iterationCreate(workoutId: string, workoutExerciseId: string, body: Omit<IIterations, '_id'>) {
        const workout = await WorkoutModel.findById(workoutId)
        if (!workout) {
            throw ApiError.BadRequest(`Тренировка не найдена`)
        }
        const workoutExercise = await WorkoutExerciseModel.findById(workoutExerciseId)
        if (!workoutExercise) {
            throw ApiError.BadRequest(`Упражнение в тренировке не найдено`)
        }
        const workoutIteration = await WorkoutIterationModel.create(body)

        await WorkoutExerciseModel.findOneAndUpdate(
            {_id: workoutExercise.id},
            {$addToSet: {iterations: workoutIteration.id}},
            {new: true}
        ).populate('iterations');

        return WorkoutModel.findById(workoutId).populate({
            path: 'workoutExercises',
            populate: [{
                path: 'iterations',
            }, {
                path: 'exercise',
                populate: {
                    path: 'group'
                }
            }]
        })
    }

    async iterationUpdate(workoutId: string, workoutExerciseId: string, iterationId: string, body: Omit<IIterations, '_id'>) {
        const workout = await WorkoutModel.findById(workoutId)
        if (!workout) {
            throw ApiError.BadRequest(`Тренировка не найдена`)
        }
        const workoutExercise = await WorkoutExerciseModel.findById(workoutExerciseId)
        if (!workoutExercise) {
            throw ApiError.BadRequest(`Упражнение в тренировке не найдено`)
        }
        await WorkoutIterationModel.create(body)
        const updatedData = await WorkoutIterationModel.findByIdAndUpdate(
            iterationId,
            body,
            {new: true}
        );

        if (updatedData) {
            return WorkoutModel.findById(workoutId).populate({
                path: 'workoutExercises',
                populate: [{
                    path: 'iterations',
                }, {
                    path: 'exercise',
                    populate: {
                        path: 'group'
                    }
                }]
            })
        } else {
            throw new ApiError(404, 'Данные не найдены')
        }
    }

    async iterationDelete(workoutId: string, workoutExerciseId: string, iterationId: string) {
        const workout = await WorkoutModel.findById(workoutId)
        if (!workout) {
            throw ApiError.BadRequest(`Тренировка не найдена`)
        }
        const workoutExercise = await WorkoutExerciseModel.findById(workoutExerciseId)
        if (!workoutExercise) {
            throw ApiError.BadRequest(`Упражнение в тренировке не найдено`)
        }

        await WorkoutIterationModel.findByIdAndDelete(iterationId)

        await WorkoutExerciseModel.findOneAndUpdate(
            {_id: workoutExerciseId},
            {$pull: {iteration: iterationId}},
            {new: true}
        )

        return WorkoutModel.findById(workoutId).populate({
            path: 'workoutExercises',
            populate: [{
                path: 'iterations',
            }, {
                path: 'exercise',
                populate: {
                    path: 'group'
                }
            }]
        })
    }

    // async update(id: string, name: string) {
    //     try {
    //         const updatedData = await GroupModel.findByIdAndUpdate(
    //             id,
    //             {name},
    //             {new: true}
    //         );
    //
    //         if (updatedData) {
    //             return updatedData
    //         } else {
    //             throw new ApiError(404, 'Данные не найдены')
    //         }
    //     } catch (error) {
    //         throw ApiError.ServerError()
    //     }
    // }
    //
    // async delete(id: string) {
    //     return GroupModel.findByIdAndDelete(id)
    // }
}

export default new

WorkoutService()