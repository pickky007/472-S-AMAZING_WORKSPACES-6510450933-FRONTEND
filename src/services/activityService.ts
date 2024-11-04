import axios from '../apis/axios';
import { ENDPOINTS } from '../apis/endpoints';
import { IActivityCreate, IActivityResponse } from '../types/activity.types';
import { Activity } from '../models/Activity';

export class ActivityService {
    // Function to get activities by section and workspace ID
    static async getActivitiesBySectionAndWorkspace(sectionId: number, workspaceId: string): Promise<Activity[]> {
        try {
            const response = await axios.get<IActivityResponse[]>(ENDPOINTS.WORKSPACE.GET_ACTIVITIES(workspaceId,sectionId));
            return response.data.map(activity => Activity.fromResponse(activity));
        } catch (error) {
            throw new Error('Failed to fetch activities');
        }
    }

    static async createActivity(activity: IActivityCreate): Promise<Activity> {
        try {
            const response = await axios.post<IActivityResponse>(ENDPOINTS.WORKSPACE.CREATE_ACTIVITY(activity.section_id, activity.workspace_id), activity);
            return Activity.fromResponse(response.data);
        } catch (error) {
            throw new Error('Failed to create activity');
        }
    }

    static async moveActivity(workspace_id: number, to_section_id: number, activity_id: number): Promise<any> {
        try {
            const response = await axios.post(ENDPOINTS.WORKSPACE.MOVE_ACTIVITY(workspace_id), {
                new_section_id: to_section_id,
                activity_id: activity_id
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to move activity');
        }
    }
}
