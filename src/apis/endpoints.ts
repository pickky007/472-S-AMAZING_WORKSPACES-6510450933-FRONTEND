import { Workspace } from "../models/Workspace";

export const ENDPOINTS = {
  USER: {
    GET: (id: number) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
    LIST: '/users',
    LOGIN: ()=> `/login`,
    REGISTER: ()=> `/register`,
  },
  WORKSPACE: {
    GET_BY_USERNAME: (username: string) => `/users/${username}/workspaces`,
    GET_SECTIONS: (workspaceId: string) =>
        `/workspaces/${workspaceId}/sections`, // New endpoint for sections
    GET_ACTIVITIES: (workspaceId: string, sectionId: number) =>
        `/workspaces/${workspaceId}/sections/${sectionId}/activities`, // New endpoint for activities
    CREATE: (username: string, ) => `/users/${username}/workspaces/create`,
    JOIN: (username: string, workspace_id: string) => `/users/${username}/workspaces/${workspace_id}/join`,
    CREATE_SECTION: (workspace_id: string) => `/workspaces/${workspace_id}/sections/create`,
    CREATE_ACTIVITY: (workspace_id: string, section_id: number, owner: string) => `/workspaces/${workspace_id}/${section_id}/activities/create/${owner}`,
    GET_ALL_ACTIVITY:(workspace_id: string)=>`/workspaces/${workspace_id}/activities`,
    MOVE_ACTIVITY: (workspace_id: string) => `/workspaces/${workspace_id}/activities/move`,
    EDIT_ACTIVITY: (workspace_id: string, section_id: number, activity_id: number) => `/workspaces/${workspace_id}/${section_id}/activities/${activity_id}/edit`,
    EDIT_SECTION: (workspace_id: string, section_id: number) => `/workspaces/${workspace_id}/${section_id}/edit`,
    SEND_MESSAGE: () => `/messages`,
    GET_MESSAGES: (workspace_id: string) => `/messages/${workspace_id}`,
    DELETE_MESSAGE: () => '/message/delete',
  },
};
