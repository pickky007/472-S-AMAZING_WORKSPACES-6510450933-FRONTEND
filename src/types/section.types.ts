import { Activity } from "./activity.types";

export interface Section {
  id: string;
  title: string;
  activities: Activity[];
}