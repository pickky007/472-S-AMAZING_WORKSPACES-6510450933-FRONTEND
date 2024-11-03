import { IActivityCreate, IActivityResponse } from "../types/activity.types";

class Activity {
    id: string | undefined = undefined;
    name: string;
    description: string | undefined = undefined;
    startDate: Date | undefined = undefined;
    endDate: Date | undefined = undefined;
    priority: "high" | "low" = "low";

    constructor(i: IActivityCreate) {
        this.name = i.name;
        this.description = i.description;
        this.startDate = i.startDate;
        this.endDate = i.endDate;
        this.priority = i.priority;
    }

    toJSON(): IActivityCreate {
        return {
            description: this.description!,
            endDate: this.endDate!,
            name: this.name!,
            priority: this.priority!,
            startDate: this.startDate!
        }
    }

    fromJSON(data: IActivityResponse): Activity {
        return new Activity(data);
    }
}

export {Activity};