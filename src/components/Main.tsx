import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import '../styles/main.scss'

function Main() {


	return (
		<div className="main">
			<Sidebar />
			<Outlet />
		</div>
	)
}

export default Main