import ApiError from "../exceptions/api-error";
import ExerciseModel from "../models/exercise-model";
import {TExerciseRequest} from "../common/interfaces/exercise";
import GroupModel from "../models/group-model";

class ExerciseService {

    async get() {
        return ExerciseModel.find({}).populate('group');
    }

    async create(name: string, groupId: string) {
        const candidate = await ExerciseModel.findOne({name})
        if (candidate) {
            throw ApiError.BadRequest(`Упражнение ${name} уже существует`)
        }

        const exercise = await ExerciseModel.create({name, group: groupId})
        const group = await GroupModel.findById(exercise.group)
        return {
            _id: exercise.id,
            name: exercise.name,
            group
        }
    }

    async update(id: string, {name, groupId}: TExerciseRequest) {
        try {
            const updatedData = await ExerciseModel.findByIdAndUpdate(
                id,
                {
                    name,
                    group: groupId,
                },
                {new: true}
            );

            if (updatedData) {
                const group = await GroupModel.findById(updatedData.group)
                return {
                    _id: updatedData.id,
                    name: updatedData.name,
                    group
                }
            } else {
                throw new ApiError(404, 'Данные не найдены')
            }
        } catch (error) {
            throw ApiError.ServerError()
        }
    }

    async delete(id: string) {
        return ExerciseModel.findByIdAndDelete(id)
    }
}

export default new ExerciseService()