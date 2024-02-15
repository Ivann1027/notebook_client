import { configureStore } from "@reduxjs/toolkit"
import { notesApi } from "./services/notesApi"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authApi } from "./services/authApi"
import { foldersApi } from "./services/foldersApi"


export const store = configureStore({
	reducer: {
		[notesApi.reducerPath]: notesApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[foldersApi.reducerPath]: foldersApi.reducer
	},
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware().concat(notesApi.middleware, authApi.middleware, foldersApi.middleware)
})

setupListeners(store.dispatch)