import { apiClient } from "./apiClient";

/* =========================================================
   TECHNICIAN PROFILE
========================================================= */

export interface TechnicianProfile {
  id: string;
  region: string;
  skills: string;
  status: string;
  profile_photo?: string | null;
  created_at?: string;
  updated_at?: string;
}

/* =========================================================
   TECHNICIAN
========================================================= */

export interface Technician {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  technician_profile?: TechnicianProfile;
}

/* =========================================================
   PAGINATED RESPONSE
========================================================= */

export interface TechniciansResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Technician[];
}

/* =========================================================
   TECHNICIAN JOB
========================================================= */

export interface TechnicianJob {
  id: string;
  job_type?: string;
  status?: string;
  priority?: string;
  scheduled_date?: string;
  address?: string;
  notes?: string;

  customer?: string;
  dealer?: string;
  product?: string;

  installation_request?: string;
  replacement_kit_request?: string;

  customer_rating?: number | null;

  created_at?: string;
  updated_at?: string;
}

/* =========================================================
   TECHNICIAN JOBS RESPONSE
========================================================= */

export interface TechnicianJobsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TechnicianJob[];
}

/* =========================================================
   TECHNICIAN PERFORMANCE
========================================================= */

export interface TechnicianPerformance {
  technician_id: string;
  full_name: string;
  email: string;
  status: string;

  total_jobs: number;
  completed_jobs: number;
  pending_jobs: number;
  cancelled_jobs: number;

  average_rating: number | null;
}

/* =========================================================
   CREATE PAYLOAD
========================================================= */

export interface CreateTechnicianPayload {
  full_name: string;
  email: string;
  password: string;
  phone?: string;

  technician_profile?: {
    region?: string;
    skills?: string;
    status?: string;
  };
}

/* =========================================================
   UPDATE PAYLOAD
========================================================= */

export interface UpdateTechnicianPayload {
  full_name?: string;
  email?: string;
  phone?: string;

  technician_profile?: {
    region?: string;
    skills?: string;
    status?: string;
  };
}

/* =========================================================
   TECHNICIAN SERVICE
========================================================= */

export const technicianService = {
  /* =======================================================
     GET ALL TECHNICIANS
  ======================================================= */

  async getTechnicians(
    search = "",
    page = 1
  ): Promise<
    TechniciansResponse | Technician[]
  > {
    const params =
      new URLSearchParams();

    if (search.trim()) {
      params.append(
        "search",
        search.trim()
      );
    }

    params.append(
      "page",
      String(page)
    );

    return apiClient.get<
      TechniciansResponse | Technician[]
    >(
      `/api/technicians/admin/technicians/?${params.toString()}`
    );
  },

  /* =======================================================
     GET SINGLE TECHNICIAN
  ======================================================= */

  async getTechnician(
    id: string
  ): Promise<Technician> {
    return apiClient.get<Technician>(
      `/api/technicians/admin/technicians/${id}/`
    );
  },

  /* =======================================================
     CREATE TECHNICIAN
  ======================================================= */

  async createTechnician(
    payload:
      | FormData
      | CreateTechnicianPayload
  ): Promise<Technician> {
    return apiClient.post<Technician>(
      "/api/technicians/admin/technicians/",
      payload
    );
  },

  /* =======================================================
     UPDATE TECHNICIAN
  ======================================================= */

  async updateTechnician(
    id: string,
    payload:
      | FormData
      | UpdateTechnicianPayload
  ): Promise<Technician> {
    return apiClient.patch<Technician>(
      `/api/technicians/admin/technicians/${id}/`,
      payload
    );
  },

  /* =======================================================
     PARTIAL UPDATE
  ======================================================= */

  async patchTechnician(
    id: string,
    payload:
      | FormData
      | Partial<UpdateTechnicianPayload>
  ): Promise<Technician> {
    return apiClient.patch<Technician>(
      `/api/technicians/admin/technicians/${id}/`,
      payload
    );
  },

  /* =======================================================
     DELETE TECHNICIAN
  ======================================================= */

  async deleteTechnician(
    id: string
  ): Promise<void> {
    if (!id) {
      throw new Error(
        "Technician ID is required."
      );
    }

    await apiClient.delete(
      `/api/technicians/admin/technicians/${id}/`
    );
  },

  /* =======================================================
     GET TECHNICIAN JOBS
  ======================================================= */

  async getTechnicianJobs(
    technicianId: string
  ): Promise<TechnicianJob[]> {
    const response =
      await apiClient.get<
        TechnicianJobsResponse | TechnicianJob[]
      >(
        `/api/technicians/operations/jobs/?technician=${technicianId}`
      );

    if (Array.isArray(response)) {
      return response;
    }

    return response.results || [];
  },

  /* =======================================================
     GET TECHNICIAN PERFORMANCE
  ======================================================= */

  async getTechnicianPerformance(
    technicianId: string
  ): Promise<TechnicianPerformance> {
    return apiClient.get<TechnicianPerformance>(
      `/api/technicians/operations/technicians/${technicianId}/`
    );
  },

  /* =======================================================
     GET CURRENT TECHNICIAN PROFILE
  ======================================================= */

  async getMyProfile(): Promise<Technician> {
    return apiClient.get<Technician>(
      "/api/technicians/dashboard/my-profile/me/"
    );
  },

  /* =======================================================
     UPDATE CURRENT PROFILE
  ======================================================= */

  async updateMyProfile(
    payload:
      | FormData
      | UpdateTechnicianPayload
  ): Promise<Technician> {
    return apiClient.patch<Technician>(
      "/api/technicians/dashboard/my-profile/me/",
      payload
    );
  },

  /* =======================================================
     GET MY JOBS
  ======================================================= */

  async getMyJobs(
    page = 1
  ): Promise<
    TechnicianJobsResponse | TechnicianJob[]
  > {
    const params =
      new URLSearchParams();

    params.append(
      "page",
      String(page)
    );

    return apiClient.get<
      TechnicianJobsResponse | TechnicianJob[]
    >(
      `/api/technicians/dashboard/my-jobs/?${params.toString()}`
    );
  },

  /* =======================================================
     GET MY PERFORMANCE
  ======================================================= */

  async getMyPerformance(): Promise<TechnicianPerformance> {
    return apiClient.get<TechnicianPerformance>(
      "/api/technicians/dashboard/my-performance/me/"
    );
  },
};