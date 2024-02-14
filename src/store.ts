import { configureStore } from "@reduxjs/toolkit"
import { notesApi } from "./services/notesApi"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authApi } from "./services/authApi"


export const store = configureStore({
	reducer: {
		[notesApi.reducerPath]: notesApi.reducer,
		[authApi.reducerPath]: authApi.reducer
	},
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware().concat(notesApi.middleware, authApi.middleware)
})

setupListeners(store.dispatch)