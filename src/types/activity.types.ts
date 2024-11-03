export interface IActivityCreate {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    priority: "high" | "low";
}

export interface IActivityResponse extends IActivityCreate {
    id: string;
}

