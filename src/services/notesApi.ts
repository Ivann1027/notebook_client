import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import { NoteT } from "../types/types"

export const notesApi = createApi({
	reducerPath: 'notesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	tagTypes: ['Notes', 'Note', 'Folders'],
	endpoints: (builder) => ({
		getAllNotes: builder.query<NoteT[], string>({
			query: (userId) => `users/${userId}/notes`,
			providesTags: result => ['Notes']
		}),
		getNote: builder.query<NoteT, {userId: string, noteId: string}>({
			query: ({ userId, noteId }) => `users/${userId}/notes/${noteId}`,
			providesTags: result => ['Note']
		})
	}),
})

export const { useGetAllNotesQuery, useGetNoteQuery } = notesApi