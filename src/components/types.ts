// types.ts
export interface IActivityCard {
  id: string;
  rawId: number;
  color: string;
  title: string;
  description: string;
  owner: string;
  date: string;
  sectionId: string;
}

export interface ISectionCard {
  id: string;
  rawId: number;
  title: string;
  activities: IActivityCard[];
}

export type ActivityDragEvent = {
  activity: IActivityCard;
  sourceSection: string;
  targetSection: string;
  targetIndex: number;
}

// Optional - if you need separate backend types
export interface IActivityResponse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  // Add other backend fields as needed
}

export interface IActivityCreate {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  workspace_id: string;
  section_id: number;
}