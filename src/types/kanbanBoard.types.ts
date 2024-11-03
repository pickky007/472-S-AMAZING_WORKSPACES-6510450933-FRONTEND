import { ISectionResponse } from "./section.types";

export interface IKanbanBoardCreate {
    name: string;
    description: string;
    spaceID: string;
}

export interface IKanbanBoardResponse extends IKanbanBoardCreate {
    id: string;
    sections: ISectionResponse[];
}