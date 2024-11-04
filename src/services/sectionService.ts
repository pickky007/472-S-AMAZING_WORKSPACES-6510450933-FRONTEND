import axios from '../apis/axios';
import { ENDPOINTS } from '../apis/endpoints';
import { ISectionCreate, ISectionResponse } from '../types/section.types';
import { Section } from '../models/Section';

export class SectionService {
  // Function to get all sections by workspace ID
  static async getAllSectionsByWorkspaceId(
    workspaceId: string,
  ): Promise<Section[]> {
    try {
      const response = await axios.get<ISectionResponse[]>(
        ENDPOINTS.WORKSPACE.GET_SECTIONS(workspaceId),
      );
      return response.data.map((section) => Section.fromResponse(section));
    } catch (error) {
      throw new Error('Failed to fetch sections');
    }
  }

  /**
   * @param section **ต้องกำหนด section.workspace_id มาด้วย**
   */
  static async createSection(section: ISectionCreate): Promise<Section> {
    try {
      const response = await axios.post<ISectionResponse>(ENDPOINTS.WORKSPACE.CREATE_SECTION(section.workspace_id), {name: section.name});
      return Section.fromResponse(response.data);
    } catch (error) {
      throw new Error('Failed to create section');
    }
  }

  /**
   * @param section **ต้องกำหนด section.workspace_id มาด้วย**
   */
  static async editSection(workspace_id: number, section_id: number, new_name: string): Promise<Section> {
    try {
      const response = await axios.post<ISectionResponse>(ENDPOINTS.WORKSPACE.EDIT_SECTION(workspace_id, section_id), {
        new_name: new_name
      });
      return Section.fromResponse(response.data);
    } catch (error) {
      throw new Error('Failed to edit section');
    }
  }
}
