// section.types.ts
export interface ISectionResponse {
    id: number;
    workspace_id: number;
    name: string;
}

export interface ISectionCreate {
    workspace_id: number;
    name: string;
}