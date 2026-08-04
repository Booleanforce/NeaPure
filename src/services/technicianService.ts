import { apiClient } from './apiClient';

export interface TechnicianProfile {
  region: string;
  skills: string;
  status: 'AVAILABLE' | 'ON_JOB' | 'OFF_DUTY';
}

export interface Technician {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  created_at: string;
  technician_profile?: TechnicianProfile;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const technicianService = {
  getTechnicians: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get<PaginatedResponse<Technician>>(`/technicians/admin/technicians/${query}`);
  },

  getTechnician: (id: string) => {
    return apiClient.get<Technician>(`/technicians/admin/technicians/${id}/`);
  },

  createTechnician: (data: Partial<Technician>) => {
    return apiClient.post<Technician>('/technicians/admin/technicians/', data);
  },

  updateTechnician: (id: string, data: Partial<Technician>) => {
    return apiClient.patch<Technician>(`/technicians/admin/technicians/${id}/`, data);
  },

  deleteTechnician: (id: string) => {
    return apiClient.delete(`/technicians/admin/technicians/${id}/`);
  },
};
