import axios from '../apis/axios';
import { ENDPOINTS } from '../apis/endpoints';
import { Workspace } from '../models/Workspace';
import { IWorkspaceResponse, IWorkspaceCreate } from '../types/workspace.types';

export class WorkspaceService {
    // ฟังก์ชันดึง workspaces ทั้งหมดตาม username
    static async getAllWorkspaceByUsername(username: string): Promise<Workspace[]> {
        try {
            const response = await axios.get<IWorkspaceResponse[]>(`${ENDPOINTS.WORKSPACE.GET_BY_USERNAME(username)}`);
            return response.data.map(workspace => Workspace.fromResponse(workspace));
        } catch (error) {
            throw new Error('Failed to fetch workspaces');
        }
    }

    /**
     * ฟังก์ชันสร้าง workspace ใหม่
     * @param workspaceData ต้องกำหนด owner
     * @returns 
     */
    static async createWorkspace(workspaceData: IWorkspaceCreate): Promise<Workspace> {
        try {
            const response = await axios.post<IWorkspaceResponse>(ENDPOINTS.WORKSPACE.CREATE(workspaceData.owner), workspaceData);
            return Workspace.fromResponse(response.data);
        } catch (error) {
            throw new Error('Failed to create workspace');
        }
    }
}