import {Request, Response, NextFunction} from 'express'
import {IGroup} from "../common/interfaces/group";
import GroupService from "../services/group-service";

class GroupController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const groups = await GroupService.get()
            return res.json(groups)
        } catch (e) {
            next(e)
        }
    }

    async create(req: Request<void, void, Omit<IGroup, '_id`'>>, res: Response, next: NextFunction) {
        try {
            const {name} = req.body
            const group = await GroupService.create(name)
            return res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async update(req: Request<{ id: string }, void, Omit<IGroup, '_id`'>>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const {name} = req.body
            const group = await GroupService.update(id, name)
            return res.json(group)
        } catch (e) {
            next(e)
        }
    }

    async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const group = await GroupService.delete(id)
            return res.json(group)
        } catch (e) {
            next(e)
        }
    }
}

export default new GroupController()
