import { useState } from "react"
import './styles/index.scss'
import AuthorizationForm from "./components/AuthorizationForm"
import Main from "./components/Main"

function App() {
  
	const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(false)

  return (
		<div className="app">
			{isUserAuthorized ? (
				<Main />
			) : (
				<AuthorizationForm />
			)}
		</div>
  )
}

export default App
