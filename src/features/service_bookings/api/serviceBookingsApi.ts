import { api } from '@/store/api';

export const serviceBookingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: 'service-bookings/', 
        method: 'POST',
        body: formData, // RTK Query will automatically set Content-Type to multipart/form-data if body is FormData
      }),
    }),
  }),
});

export const { useCreateBookingMutation } = serviceBookingsApi;
