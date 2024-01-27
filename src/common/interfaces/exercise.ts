import {IGroup} from "./group";

export interface IExercise {
    _id: string;
    name: string
    group: IGroup
}

export type TExerciseRequest = Omit<IExercise, 'group' | '_id'> & {
    groupId: string
}