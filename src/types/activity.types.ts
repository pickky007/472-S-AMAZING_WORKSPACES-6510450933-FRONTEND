export interface IActivityResponse {
    id: number;
    name: string;
    description: string;
    priority: number; // Assuming a scale of 0 to 1
    start_date: string; // Use string for date, or adjust according to your date handling
    end_date: string;   // Same as above
    section_id: number;
}

// activity.types.ts
export interface IActivityCreate {
    name: string;
    description: string;
    priority: number;
    start_date: string;
    end_date: string;
    section_id: number;
}
