export interface IWorkspaceResponse {
    id: number;
    name: string;
    description?: string; // optional
}

export interface IWorkspaceCreate {
    name: string;
    description?: string; // optional
}