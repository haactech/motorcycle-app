import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 404) {
      console.error('Recurso no encontrado:', error);
    } else if (error.response?.status === 500) {
      console.error('Error del servidor:', error);
    } else {
      console.error('Error de red:', error);
    }
    return Promise.reject(error);
  }
);

export default {
  getMotorcycles() {
    return apiClient.get('/motorcycles');
  },

  recommendBranch(addressData) {
    console.log("Enviando datos de dirección:", addressData);
    return apiClient.post('/recommend-branch', addressData);
  },

  createClient(clientData) {
    return apiClient.post('/client', clientData);
  },
};