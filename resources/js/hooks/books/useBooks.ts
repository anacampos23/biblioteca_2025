import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  ISBN: number;
  editorial: string;
  quantity: number;
  available: boolean;
  bookcase_id: string;
  bookcase_name: string;
  zone_id: string;
  name: string;
  floor_id: string;
  floor_number: number;
  isbn_count: number;
  isbn_loan_count:number;
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

interface UseBooksParams {
  search?: any[];
  title?: string;
  author?: string;
  genre?: string;
  ISBN?: number;
  editorial?: string;
  quantity?: number;
  available?: boolean;
  bookcase_id?: string;
  bookcase_name?: string;
  zone_id?: string;
  name?: string;
  floor_id?: string;
  floor_number?: number;
  isbn_count?: number;
  isbn_loan_count?:number;
  page?: number;
  perPage?: number;
}

export function useBooks({ search, title, author, genre, ISBN, editorial, quantity, available, bookcase_id, bookcase_name, zone_id, name, floor_id, floor_number, isbn_count, isbn_loan_count, page = 1, perPage = 10 }:
    UseBooksParams = {}) {
  return useQuery({
    queryKey: ["books", { search,title, author, genre, ISBN, editorial, quantity, available, bookcase_id, bookcase_name, zone_id, name, floor_id, floor_number, isbn_count, isbn_loan_count, page, perPage }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Book>>("/api/books", {
        params: {
          search,
          title,
          author,
          genre,
          ISBN,
          editorial,
          quantity,
          available,
          bookcase_id,
          bookcase_name,
          zone_id,
          name,
          floor_id,
          floor_number,
          isbn_count,
          isbn_loan_count,
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
      } as PaginatedResponse<Book>;
    },
  });
}

export function useCreateBook() {
  return useMutation({
    mutationFn: async (data: {
        title?: string;
        author?: string;
        genre?: string;
        ISBN?: number;
        editorial?: string;
        quantity?: number;
        available?: boolean;
        bookcase_id?: string;
        bookcase_name?: string;
        zone_id?: string;
        name?: string;
        floor_id?: string;
        floor_number?: number;
        isbn_count?: number;
        isbn_loan_count?: number;}) => {
      const response = await axios.post("/api/books", data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useUpdateBook(bookId: string) {
  return useMutation({
    mutationFn: async (data: {
        title?: string;
        author?: string;
        genre?: string;
        ISBN?: number;
        editorial?: string;
        quantity?: number;
        available?: boolean;
        bookcase_id?: string;
        bookcase_name?: string;
        zone_id?: string;
        name?: string;
        floor_id?: string;
        floor_number?: number;
        isbn_count?: number;
        isbn_loan_count:number;}) => {
      const response = await axios.put(`/api/books/${bookId}`, data, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    },
  });
}

export function useDeleteBook() {
  return useMutation({
    mutationFn: async (bookId: string) => {
      await axios.delete(`/api/books/${bookId}`, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
    },
  });
}
