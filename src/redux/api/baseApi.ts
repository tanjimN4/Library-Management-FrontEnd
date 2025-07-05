import type { IBook, IBorrowSummary } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface BooksResponse {
    success: boolean;
    message: string;
    data: IBook[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}


export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['book', 'borrowBook'],
    baseQuery: fetchBaseQuery({ baseUrl: "https://library-management-system-backend-sable.vercel.app/api" }),
    endpoints: (builder) => ({
        getBooks: builder.query<BooksResponse, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 } = {}) => `/books?page=${page}&limit=${limit}`,
            // No need to transformResponse if you want both data and pagination
            providesTags: ['book'],
        }),
        updateBook: builder.mutation<IBook, { id: string; body: Partial<IBook> }>({
            query: ({ id, body }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body,

            }),
            invalidatesTags: ['book'],
        }),
        addBook: builder.mutation({
            query: (bookData) => ({
                url: '/books',
                method: 'Post',
                body: bookData
            }),
            invalidatesTags: ['book']
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['book']
        }),
        addBorrowBook: builder.mutation({
            query: (borrowBookData) => ({
                url: '/borrow',
                method: 'POST',
                body: borrowBookData
            }),
            invalidatesTags: ['borrowBook', 'book']
        }),
        getBorrowBook: builder.query<IBorrowSummary[], void>({
            query: () => '/borrow',
            transformResponse: (res: { success: boolean; message: string; data: IBorrowSummary[] }) => res.data,
            providesTags: ['borrowBook']
        })
    })
})

export const { useGetBooksQuery, useUpdateBookMutation, useAddBookMutation, useDeleteBookMutation, useAddBorrowBookMutation, useGetBorrowBookQuery } = baseApi