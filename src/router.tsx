import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "./App"
import Note from "./components/Note/Note"
import CreateNote from "./components/Note/CreateNote"

export const router = createBrowserRouter(
	createRoutesFromElements(
			<Route path='/' element={<App />}>
				<Route path='notes/:noteId' element={<Note />} />
				<Route path='notes/createNote' element={<CreateNote />} />
			</Route>
	)
)