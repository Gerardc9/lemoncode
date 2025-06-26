// Cambiar a true para usar servidor local (ejercicio 2)
export const USE_LOCAL_SERVER = false;

export const API_CONFIG = {
  useLocalServer: USE_LOCAL_SERVER,
  realApiUrl: 'https://rickandmortyapi.com/api',
  localApiUrl: 'http://localhost:3000/api',
  // Funcionalidades disponibles según el servidor
  features: {
    canCreate: !USE_LOCAL_SERVER,
    canDelete: !USE_LOCAL_SERVER,
    canEdit: true,
    canViewList: true,
    canViewDetail: true,
  },
};
