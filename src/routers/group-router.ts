import express, {Router} from "express";
import GroupController from "../controllers/group-controller";

export const groupRouter: Router = express.Router()

groupRouter.get('/', GroupController.get)
groupRouter.post('/', GroupController.create)
groupRouter.patch('/:id', GroupController.update)
groupRouter.delete('/:id', GroupController.delete)

