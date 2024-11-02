export const ENDPOINTS = {
  USER: {
    GET: (id: number) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
    LIST: '/users'
  }
};