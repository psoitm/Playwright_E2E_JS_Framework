export const ENDPOINTS = {
    GET_SINGLE: (id) => `/objects/${id}`,//objects/2
    GET_ALLOBJECTS: '/objects',
    CREATE_OBJECT: '/objects',
    UPDATE_OBJECT: (id) => `/objects/${id}`,
    DELETE_OBJECT: (id) => `/objects/${id}`,
    PARTIALUPDATE_OBJECT: (id) => `/objects/${id}`
};