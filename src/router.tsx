import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Note from "./components/Note/Note"
import CreateNote from "./components/Note/CreateNote"
import EditNote from "./components/Note/EditNote"
import ErrorBoundary from "./components/ErrorBoundary"

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: 'notes/:noteId',
				element: <Note />
			}, {
				path: 'notes/createNote',
				element: <CreateNote />
			}, {
				path: 'notes/:noteId/edit',
				element: <EditNote />
			}
		]
	}
])