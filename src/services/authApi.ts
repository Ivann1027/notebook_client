import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UserReq } from "../types/types"

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth/' }),
	endpoints: (builder) => ({
		login: builder.mutation<any, UserReq>({
			query: (body) => ({
				url: 'login',
				method: 'POST',
				body
			})
		})
	})
})

export const {useLoginMutation} = authApi