import { configureStore } from "@reduxjs/toolkit"
import { notesApi } from "./services/notesApi"
import { setupListeners } from "@reduxjs/toolkit/query"


export const store = configureStore({
	reducer: {
		[notesApi.reducerPath]: notesApi.reducer
	},
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware().concat(notesApi.middleware)
})

setupListeners(store.dispatch)