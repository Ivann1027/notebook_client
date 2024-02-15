import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react'
import '../styles/main.scss'

interface SidebarMenuProps {
	x: number
	y: number
	showMenu: boolean
	setShowMenu: Dispatch<SetStateAction<boolean>>
	userId: number
	setIsAddingFolder: Dispatch<SetStateAction<boolean>>
}

const SidebarMenu: FC<SidebarMenuProps> = ({x, y, showMenu, setShowMenu, userId, setIsAddingFolder}) => {

	const closeMenu = useCallback(() => {
		if (showMenu) setShowMenu(false) 
	}, [])
	
	useEffect(() => {
		document.addEventListener('click', closeMenu)
		return () => {
			document.removeEventListener('click', closeMenu)
		}
	}, [closeMenu, showMenu])

	return (
		<div style={{top: y, left: x}} className="sidebar__menu">
			<button onClick={() => setIsAddingFolder(true)}>Добавить папку</button>
		</div>
	)
}

export default SidebarMenu