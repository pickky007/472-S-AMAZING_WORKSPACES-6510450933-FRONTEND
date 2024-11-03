export interface IWorkspaceResponse {
    id: number;
    name: string;
    description?: string; // optional
    owner: string;
}

export interface IWorkspaceCreate {
    name: string;
    description?: string; // optional
    owner: string;
}