import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AuthorizedUser, LoginUser, RegUser } from "../types/types"

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth/' }),
	endpoints: (builder) => ({
		login: builder.mutation<AuthorizedUser, LoginUser>({
			query: (body) => ({
				url: 'login',
				method: 'POST',
				body
			})
		}),
		registrate: builder.mutation<AuthorizedUser, RegUser>({
			query: (body) => ({
				url: 'registration',
				method: 'POST',
				body
			})
		})
	})
})

export const {useLoginMutation, useRegistrateMutation} = authApi