import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import '../styles/main.scss'
import Notebook from "./Notebook"

function Main() {


	return (
		<div className="main">
			<Sidebar />
			<Notebook />
		</div>
	)
}

export default Main