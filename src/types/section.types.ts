// section.types.ts
export interface ISectionResponse {
    id: number;
    workspace_id: string;
    name: string;
}

export interface ISectionCreate {
    workspace_id: string;
    name: string;
}