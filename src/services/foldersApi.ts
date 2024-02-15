import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FolderT } from "../types/types"

export const foldersApi = createApi({
	reducerPath: 'foldersApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	tagTypes: ['Folders', 'Folder'],
	endpoints: (builder) => ({
		getAllFolders: builder.query<FolderT[], string>({
			query: (userId) => `users/${userId}/folders`,
			providesTags: result => ['Folders']
		}),
		getFolder: builder.query<FolderT, { userId: string, folderId: string }>({
			query: ({ userId, folderId }) => `users/${userId}/folders/${folderId}`,
			providesTags: result => ['Folder']
		}),
		deleteFolder: builder.mutation<void, { userId: string, folderId: string }>({
			query: ({ userId, folderId }) => ({
				url: `users/${userId}/folders/${folderId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Folders']
		}),
		renameFolder: builder.mutation<FolderT, { userId: string, folderId: string, name: string }>({
			query: ({ userId, folderId, name }) => ({
				url: `users/${userId}/folders/${folderId}`,
				method: 'PUT',
				body: { name }
			}), 
			invalidatesTags: ['Folders']
		})
	})
})

export const {useGetAllFoldersQuery, useGetFolderQuery, useDeleteFolderMutation, useRenameFolderMutation} = foldersApi