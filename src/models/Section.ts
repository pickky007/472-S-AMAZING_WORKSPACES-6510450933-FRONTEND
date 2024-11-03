import { ISectionCreate, ISectionResponse } from "../types/section.types";
import { Activity } from "./Activity";

class Section {
    name: string;
    kanbanBoardName: string;
    activities: Activity[] = [];

    constructor(i: ISectionResponse) {
        this.name = i.name;
        this.kanbanBoardName = i.kanbanBoardName;
        this.activities = i.activities.map(a=>new Activity(a));
    }

    toJSON(): ISectionCreate {
        return {
            kanbanBoardName: this.kanbanBoardName,
            name: this.name
        }
    }

    fromJSON(data: ISectionResponse): Section {
        return new Section(data);
    }
}

export {Section};