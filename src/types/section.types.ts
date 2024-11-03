import { IActivityResponse } from "./activity.types";

export interface ISectionCreate {
    name: string;
    kanbanBoardName: string;
}

export interface ISectionResponse extends ISectionCreate {
    activities: IActivityResponse[];
}