import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4200', // URL de tu API Flask
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Obtener todas las motocicletas
  getMotorcycles() {
    return apiClient.get('/motorcycles');
  },

  // Calcular la sucursal recomendada
  recommendBranch(addressData) {
    console.log("valor de addressData: ",addressData)
    return apiClient.post('/recommend-branch', addressData);
  },

  // Crear un nuevo cliente
  createClient(clientData) {
    return apiClient.post('/client', clientData);
  },
};