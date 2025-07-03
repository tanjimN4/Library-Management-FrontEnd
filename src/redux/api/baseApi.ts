import type { IBook } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes:['book'],
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api"}),
    endpoints:(builder)=>({
        getBooks:builder.query({
            query:()=>'/books',
            transformResponse: (res: { success: boolean; message: string; data :IBook[]}) => res.data,
            providesTags:['book']
        }),
        updateBook:builder.mutation<IBook,{id:string; body:Partial<IBook>}>({
            query:({id,body})=>({
                url:`/books/${id}`,
                method:"PUT",
                body,
            }),
             invalidatesTags: ['book'],
        })
    })
})

export const {useGetBooksQuery,useUpdateBookMutation} = baseApi