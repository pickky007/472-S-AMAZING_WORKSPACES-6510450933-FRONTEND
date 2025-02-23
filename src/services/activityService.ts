import axios from '../apis/axios';
import { ENDPOINTS } from '../apis/endpoints';
import { IActivityCreate, IActivityResponse } from '../types/activity.types';
import { Activity } from '../models/Activity';

export class ActivityService {
  // Function to get activities by section and workspace ID

  static async getActivityByWorkspace(
    workspaceId: string,
  ): Promise<Activity[]> {
    try{
      const response = await axios.get<IActivityResponse[]>(
        ENDPOINTS.WORKSPACE.GET_ALL_ACTIVITY(workspaceId),
        {
          withCredentials: true,
        },

      )
      return response.data.map((activity) => Activity.fromResponse(activity));
    } catch (error) {
      throw new Error('Failed to fetch activity');
    }
    
  }

  
  static async getActivitiesBySectionAndWorkspace(
    sectionId: number,
    workspaceId: string,
  ): Promise<Activity[]> {
    try {
      const response = await axios.get<IActivityResponse[]>(
        ENDPOINTS.WORKSPACE.GET_ACTIVITIES(workspaceId, sectionId),
        {
          withCredentials: true,
        },
      );

      // ตรวจสอบว่ามีข้อมูลใน response.data หรือไม่
      if (!response.data || response.data.length === 0) {
        console.warn(
          `No activities found for sectionId: ${sectionId} in workspaceId: ${workspaceId}`,
        );
        return []; // ส่งกลับอาร์เรย์ว่างถ้าไม่มีข้อมูล
      }

      // หากมีข้อมูล กำหนดแปลงข้อมูล
      return response.data.map((activity) => Activity.fromResponse(activity));
    } catch (error) {
      console.error(
        `Error fetching activities for section ${sectionId} in workspace ${workspaceId}:`,
        error,
      );
      throw new Error('Failed to fetch activities'); // คุณสามารถโยนข้อผิดพลาดนี้ได้ตามต้องการ
    }
  }

  static async createActivity(activity: IActivityCreate): Promise<Activity> {
    try {
      const response = await axios.post<IActivityResponse>(
        ENDPOINTS.WORKSPACE.CREATE_ACTIVITY(
          activity.workspace_id,
          activity.section_id,
          activity.owner,
        ),
        activity,
        {
          withCredentials: true,
        },
      );
      return Activity.fromResponse(response.data);
    } catch (error) {
      throw new Error('Failed to create activity');
    }
  }

  static async moveActivity(
    workspace_id: string,
    to_section_id: number,
    activity_id: number,
  ): Promise<any> {
    try {
      const response = await axios.post(
        ENDPOINTS.WORKSPACE.MOVE_ACTIVITY(workspace_id),
        {
          new_section_id: to_section_id,
          activity_id: activity_id,
        },
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to move activity');
    }
  }

  static async editActivity(
    workspace_id: string,
    section_id: number,
    activity_id: number,
    activity: IActivityCreate,
  ): Promise<Activity> {
    try {
      const response = await axios.post(
        ENDPOINTS.WORKSPACE.EDIT_ACTIVITY(
          workspace_id,
          section_id,
          activity_id,
        ),
        {
          name: activity.name,
          description: activity.description,
          start_date: activity.start_date,
          end_date: activity.end_date,
        },
        {
          withCredentials: true,
        },
      );
      return Activity.fromResponse(response.data);
    } catch (error) {
      throw new Error('Failed to edit activity');
    }
  }
}
