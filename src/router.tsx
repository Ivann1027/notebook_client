import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import App from "./App"
import Notebook from "./components/Notebook"

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />} >
			<Route path='' element={<Navigate to='notebook' />} />
			<Route path='notebook' element={<Notebook />} />
		</Route>
	)
)