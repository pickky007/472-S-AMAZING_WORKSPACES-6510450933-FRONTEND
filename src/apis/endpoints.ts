export const ENDPOINTS = {
  USER: {
    GET: (id: number) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
    LIST: '/users',
    LOGIN: '/auth/login', // Endpoint สำหรับล็อกอิน
    REGISTER: '/auth/register', // Endpoint สำหรับลงทะเบียน
  },
  WORKSPACE: {
    GET_BY_USERNAME: (username: string) => `/users/${username}/workspaces`,
    GET_SECTIONS: (workspaceId: string) =>
        `/workspaces/${workspaceId}/sections`, // New endpoint for sections
    GET_ACTIVITIES: (workspaceId: string, sectionId: number) =>
        `/workspaces/${workspaceId}/sections/${sectionId}/activities`, // New endpoint for activities
    CREATE: (username: string, ) => `/users/${username}/workspaces/create`,
    JOIN: (username: string, workspace_id: number) => `/users/${username}/workspaces/${workspace_id}/join`,
    CREATE_SECTION: (workspace_id: number) => `/workspaces/${workspace_id}/sections/create`,
    CREATE_ACTIVITY: (workspace_id: number, section_id: number) => `/workspaces/${workspace_id}/${section_id}/activities/create`,
    MOVE_ACTIVITY: (workspace_id: number) => `/workspaces/${workspace_id}/activities/move`,
  },
};
