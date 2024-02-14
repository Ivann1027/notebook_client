import { useContext, useState } from "react"
import './styles/index.scss'
import AuthorizationForm from "./components/auth/Authorization"
import Main from "./components/Main"
import { CustomContext } from "./context/UserContext"

function App() {
  
	const {user} = useContext(CustomContext)

  return (
		<div className="app">
			{user.user.isAuth ? (
				<Main />
			) : (
				<AuthorizationForm />
			)}
		</div>
  )
}

export default App
