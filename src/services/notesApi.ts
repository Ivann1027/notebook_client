import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import { NoteT } from "../types/types"

export const notesApi = createApi({
	reducerPath: 'notesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	tagTypes: ['Notes'],
	endpoints: (builder) => ({
		getAllNotes: builder.query<NoteT[], string>({
			query: (userId) => `users/${userId}/notes`,
			providesTags: result => ['Notes']
		}),
	}),
})

export const { useGetAllNotesQuery } = notesApi