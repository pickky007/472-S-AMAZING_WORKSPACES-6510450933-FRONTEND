export interface IActivityResponse {
    id: number;
    name: string;
    description: string;
    start_date: string; // Use string for date, or adjust according to your date handling
    end_date: string;   // Same as above
    section_id: number;
}

// activity.types.ts
export interface IActivityCreate {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    section_id: number;
}
