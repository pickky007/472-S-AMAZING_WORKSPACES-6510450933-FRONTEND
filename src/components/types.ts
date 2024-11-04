export interface IActivityCard {
  id: string;
  title: string;
  description: string;
  color: string;
  owner: string;
  date: string;
}

export interface ISectionCard {
  id: string;
  title: string;
  activities: IActivityCard[];
}
