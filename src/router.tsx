import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "./App"
import Notebook from "./components/Notebook"
import Note from "./components/Note/Note"
import Main from "./components/Main"

export const router = createBrowserRouter(
	createRoutesFromElements(
			<Route path='/' element={<App />}>
				<Route path='notes/:noteId' element={<Note />} />
			</Route>
	)
)