export interface IWorkspaceResponse {
    id: string;
    name: string;
    description?: string; // optional
    owner: string;
}

export interface IWorkspaceCreate {
    name: string;
    description?: string; // optional
    owner: string;
}