import axios from '../apis/axios';
import { ENDPOINTS } from '../apis/endpoints';
import { ISectionResponse } from '../types/section.types';
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
}
