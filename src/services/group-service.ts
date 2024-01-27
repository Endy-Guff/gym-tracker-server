import GroupModel from "../models/group-model";
import ApiError from "../exceptions/api-error";

class GroupService {

    async get() {
        return GroupModel.find({});
    }

    async create(name: string) {
        const candidate = await GroupModel.findOne({name})
        if (candidate) {
            throw ApiError.BadRequest(`Группа ${name} уже существует`)
        }

        return await GroupModel.create({name})
    }

    async update(id: string, name: string) {
        try {
            const updatedData = await GroupModel.findByIdAndUpdate(
                id,
                {name},
                {new: true}
            );

            if (updatedData) {
                return updatedData
            } else {
                throw new ApiError(404, 'Данные не найдены')
            }
        } catch (error) {
            throw ApiError.ServerError()
        }
    }

    async delete(id: string) {
        return GroupModel.findByIdAndDelete(id)
    }
}

export default new GroupService()