import { FC, ReactNode, createContext, useState, useEffect, Dispatch, SetStateAction } from "react"
import { AuthorizedUser } from "../types/types"


export const CustomContext = createContext<any | null>(null)

interface ContextProps {
	children: ReactNode
}

interface ContextValue {
	user: AuthorizedUser
	setUser: Dispatch<SetStateAction<AuthorizedUser>>
	emptyUser: AuthorizedUser
}

export const Context: FC<ContextProps> = ({ children }) => {
	
	const emptyUser: AuthorizedUser = { accessToken: '', user: { name: '', email: '', isAuth: false } }
	const [user, setUser] = useState<AuthorizedUser>(emptyUser)

	useEffect(() => {
		if (localStorage.getItem('currentUser') === null) {
			localStorage.setItem('currentUser', JSON.stringify(emptyUser))
		} else {
			setUser(JSON.parse(localStorage.getItem('currentUser') as string))
		}
	}, [])

	const value: ContextValue = {
		user, 
		setUser,
		emptyUser
	}

	return (
		<CustomContext.Provider value={value}>
			{children}
		</CustomContext.Provider>
	)
}