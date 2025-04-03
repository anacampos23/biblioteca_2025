import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";

export interface Bookcase {
  id: string;
  bookcase_name: number;
  zone_id: string;
  floor_id: string;
  created_at: string;
}

// Interface representing the actual API response structure
export interface ApiPaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Interface representing the expected format for the Table component
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

interface UseBookcasesParams {
  search?: string;
  bookcase_name?: number;
  zone_id?: string;
  floor_id?: string;
  page?: number;
  perPage?: number;
}

export function useBookcases({ search, bookcase_name, zone_id, floor_id, page = 1, perPage = 10 }: UseBookcasesParams = {}) {
  return useQuery({
    queryKey: ["bookcases", { search, bookcase_name, zone_id, floor_id, page, perPage }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Bookcase>>("/api/bookcases", {
        params: {
          search,
          bookcase_name,
          zone_id,
          floor_id,
          page,
          per_page: perPage,
        },
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      // Transform the API response to the expected format
      return {
        data: apiResponse.data,
        meta: {
          current_page: apiResponse.current_page,
          from: apiResponse.from,
          last_page: apiResponse.last_page,
          per_page: apiResponse.per_page,
          to: apiResponse.to,
          total: apiResponse.total
        }
      } as PaginatedResponse<Bookcase>;
    },
  });
}

export function useCreateBookcase() {
  return useMutation({
    mutationFn: async (data: { bookcase_name: number; zone_id: string; floor_id: string }) => {
      const response = await axios.post("/api/bookcases", data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useUpdateBookcase(bookcaseId: string) {
  return useMutation({
    mutationFn: async (data: { bookcase_name: number; zone_id: string; floor_id: string  }) => {
      const response = await axios.put(`/api/bookcases/${bookcaseId}`, data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useDeleteBookcase() {
  return useMutation({
    mutationFn: async (bookcaseId: string) => {
      await axios.delete(`/api/ bookcases/${bookcaseId}`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
    },
  });
}
