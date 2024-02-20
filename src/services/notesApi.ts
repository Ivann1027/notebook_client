import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import { NoteT } from "../types/types"

export const notesApi = createApi({
	reducerPath: 'notesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	tagTypes: ['Notes', 'Note'],
	endpoints: (builder) => ({
		getAllNotes: builder.query<NoteT[], string>({
			query: (userId) => `users/${userId}/notes`,
			providesTags: result => ['Notes']
		}),
		getNote: builder.query<NoteT, {userId: string, noteId: string}>({
			query: ({ userId, noteId }) => `users/${userId}/notes/${noteId}`,
			providesTags: result => ['Note']
		}),
		deleteNote: builder.mutation<void, {userId: string, noteId: string}>({
			query: ({userId, noteId}) => ({
				url: `users/${userId}/notes/${noteId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Notes']
		}),
		createNote: builder.mutation<NoteT, {userId: string, title: string, content: string}>({
			query: ({ userId, title, content }) => ({
				url: `users/${userId}/notes`,
				method: 'POST',
				body: {title, content}
			}),
			invalidatesTags: ['Notes']
		})
	}),
})

export const { useGetAllNotesQuery, useGetNoteQuery, useDeleteNoteMutation, useCreateNoteMutation } = notesApi