import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";

export interface Reserve {
  id: string;
  book_id: string;
  user_id: string;
  name: string;
  email: string;
  title: string;
  author: string;
  ISBN: string;
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

interface UseReservesParams {
  search?: any[];
  book_id?: string;
  user_id?: string;
  name?: string;
  email?: string;
  title?: string;
  author?: string;
  ISBN?: string;
  page?: number;
  perPage?: number;
}

export function useReserves({ search, book_id, user_id, name, email, title, author, ISBN, page = 1, perPage = 10 }:
    UseReservesParams = {}) {
  return useQuery({
    queryKey: ["reserves", { search, book_id, user_id, name, email, title, author, ISBN, page, perPage }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Reserve>>("/api/reserves", {
        params: {
          search,
          book_id,
          user_id,
          name,
          email,
          title,
          author,
          ISBN,
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
      } as PaginatedResponse<Reserve>;
    },
  });
}

export function useCreateReserve() {
  return useMutation({
    mutationFn: async (data: {
    book_id?: string;
    user_id?: string;
    name?: string;
    email?: string;
    title?: string;
    author?: string;
    ISBN?: string;

    }) => {
      const response = await axios.post("/api/reserves", data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useUpdateReserve(reserveId: string) {
  return useMutation({
    mutationFn: async (data: {
        book_id?: string;
        user_id?: string;
        name?: string;
        email?: string;
        title?: string;
        author?: string;
        ISBN?: string;}) => {
      const response = await axios.put(`/api/reserves/${reserveId}`, data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useDeleteReserve() {
  return useMutation({
    mutationFn: async (reserveId: string) => {
      await axios.delete(`/api/reserves/${reserveId}`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
    },
  });
}
