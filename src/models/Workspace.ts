import { IWorkspaceResponse,IWorkspaceCreate } from "../types/workspace.types";

export class Workspace {
    id: number;
    name: string;
    description?: string;
    owner:string;

    constructor(data: IWorkspaceResponse) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.owner = data.owner;
    }

    toJSON(): IWorkspaceCreate {
        return {
            name: this.name,
            description: this.description,
            owner: this.owner
        };
    }

    static fromResponse(data: IWorkspaceResponse): Workspace {
        return new Workspace(data);
    }
}