import { apiClient } from './apiClient';

export interface InstallationHistory {
  id: number;
  event_type: string;
  description: string;
  performed_by: string;
  performed_by_name: string;
  performed_by_email: string;
  created_at: string;
}

export interface InstallationPhoto {
  id: number;
  photo_type: string;
  photo: string;
  uploaded_by: string;
  uploaded_by_name: string;
  created_at: string;
}

export interface InstallationChecklist {
  id: number;
  data: any;
  submitted_by: string;
  submitted_by_name: string;
  created_at: string;
}

export interface InstallationSignature {
  id: number;
  signature_image: string;
  collected_by: string;
  collected_by_name: string;
  created_at: string;
}

export interface InstallationRequest {
  id: number;
  registered_product: number;
  dealer: string;
  dealer_name: string;
  customer: string;
  customer_name: string;
  status: string;
  admin_notes: string;
  created_at: string;
  updated_at: string;
  history_logs: InstallationHistory[];
  photos: InstallationPhoto[];
  checklist: InstallationChecklist | null;
  signature: InstallationSignature | null;
}

export const installationsService = {
  getRequests: (params?: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/installations/requests/${query ? `?${query}` : ''}`;
    return apiClient.get<InstallationRequest[]>(endpoint);
  },

  getRequestById: (id: number) => {
    return apiClient.get<InstallationRequest>(`/installations/requests/${id}/`);
  },

  createRequest: (data: { customer: string, registered_product: number }) => {
    return apiClient.post<InstallationRequest>('/installations/requests/', data);
  },

  approveRequest: (id: number, data?: { admin_notes?: string }) => {
    return apiClient.patch<InstallationRequest>(`/installations/requests/${id}/approve/`, data);
  },

  disapproveRequest: (id: number, data?: { admin_notes?: string }) => {
    return apiClient.patch<InstallationRequest>(`/installations/requests/${id}/disapprove/`, data);
  },

  assignTechnician: (id: number, data: { technician_id: string, scheduled_date: string, address: string }) => {
    return apiClient.post<InstallationRequest>(`/installations/requests/${id}/assign_technician/`, data);
  },

  reschedule: (id: number, data: { scheduled_date: string, reason?: string }) => {
    return apiClient.post<InstallationRequest>(`/installations/requests/${id}/reschedule/`, data);
  },

  acceptJob: (id: number) => {
    return apiClient.post<InstallationRequest>(`/installations/requests/${id}/accept_job/`);
  },

  rejectJob: (id: number, data?: { reason?: string }) => {
    return apiClient.post<InstallationRequest>(`/installations/requests/${id}/reject_job/`, data);
  },

  checkIn: (id: number, data?: { location?: string }) => {
    return apiClient.post<InstallationRequest>(`/installations/requests/${id}/check_in/`, data);
  },

  checkOut: (id: number, data?: { location?: string, notes?: string }) => {
    return apiClient.post<InstallationRequest>(`/installations/requests/${id}/check_out/`, data);
  },

  uploadPhoto: (id: number, photoType: string, file: File) => {
    const formData = new FormData();
    formData.append('photo_type', photoType);
    formData.append('photo', file);
    
    // Use custom fetch request because apiClient stringifies POST bodies
    // and we need to pass FormData
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/installations/requests/${id}/upload_photos/`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg2MTE1NjcxLCJpYXQiOjE3ODYwODY4NzEsImp0aSI6ImI3N2NmZjAzNzkxNzQyNzU5MjkwYmUxZmRlYmYzNTA1IiwidXNlcl9pZCI6IjE2ZDExZjAyLWZhM2MtNDBmMC1hZTcyLTc0MTZhYThkMWI2ZCJ9.ac_6Zw2-iX7gvfnpWIqQXR5Z4EioSeu-AE3QIAXO9F8";
    
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    }).then(res => {
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    });
  },

  submitChecklist: (id: number, data: any) => {
    return apiClient.post<InstallationRequest>(`/installations/requests/${id}/checklist/`, { data });
  },

  submitSignature: (id: number, file: File) => {
    const formData = new FormData();
    formData.append('signature_image', file);
    
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/installations/requests/${id}/signature/`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg2MTE1NjcxLCJpYXQiOjE3ODYwODY4NzEsImp0aSI6ImI3N2NmZjAzNzkxNzQyNzU5MjkwYmUxZmRlYmYzNTA1IiwidXNlcl9pZCI6IjE2ZDExZjAyLWZhM2MtNDBmMC1hZTcyLTc0MTZhYThkMWI2ZCJ9.ac_6Zw2-iX7gvfnpWIqQXR5Z4EioSeu-AE3QIAXO9F8";
    
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    }).then(res => {
      if (!res.ok) throw new Error('Signature upload failed');
      return res.json();
    });
  },

  completeJob: (id: number) => {
    return apiClient.post<InstallationRequest>(`/installations/requests/${id}/complete/`);
  },

  getReport: (id: number) => {
    return apiClient.get<InstallationRequest>(`/installations/requests/${id}/report/`);
  }
};
