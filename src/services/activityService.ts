import axios from '../apis/axios';
import { ENDPOINTS } from '../apis/endpoints';
import { IActivityResponse } from '../types/activity.types';
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
}
