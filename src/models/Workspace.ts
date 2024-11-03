import { IWorkspaceResponse,IWorkspaceCreate } from "../types/workspace.types";

export class Workspace {
    id: number;
    name: string;
    description?: string;

    constructor(data: IWorkspaceResponse) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }

    toJSON(): IWorkspaceCreate {
        return {
            name: this.name,
            description: this.description,
        };
    }

    static fromResponse(data: IWorkspaceResponse): Workspace {
        return new Workspace(data);
    }
}