import { api } from '../../../store/api';

export interface ProblemStat {
  icon: 'droplet' | 'users' | 'shield' | 'check';
  value: string;
  label: string;
  description: string;
  accent: string;
}

export const problemStatsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProblemStats: builder.query<ProblemStat[], void>({
      query: () => '/problem-stats',
      providesTags: ['ProblemStats'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProblemStatsQuery } = problemStatsApi;