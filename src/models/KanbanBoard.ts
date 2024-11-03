import { IKanbanBoardCreate, IKanbanBoardResponse } from "../types/kanbanBoard.types";
import { Section } from "./Section";

class KanbanBoard {
    name: string;
    description: string = "";
    id: string;
    sections: Section[] = [];
    spaceID: string;

    constructor(i: IKanbanBoardResponse) {
        this.name = i.name;
        this.id = i.id;
        this.description = i.description;
        this.sections = i.sections.map(s=>new Section(s));
        this.spaceID = i.spaceID;
    }

    toJSON(): IKanbanBoardCreate {
        return {
            description: this.description,
            name: this.name,
            spaceID: this.spaceID,
        }
    }

    fromJSON(data: IKanbanBoardResponse) {
        return new KanbanBoard(data);
    }
}

export {KanbanBoard};