import { ISectionResponse, ISectionCreate } from "../types/section.types";

export class Section {
    id: number;
    workspaceId: number;
    name: string;

    constructor(data: ISectionResponse) {
        this.id = data.id;
        this.workspaceId = data.workspace_id;
        this.name = data.name;
    }

    toJSON(): ISectionCreate {
        return {
            workspace_id: this.workspaceId,
            name: this.name,
        };
    }

    static fromResponse(data: ISectionResponse): Section {
        return new Section(data);
    }
}