import { Dispatch, FC, SetStateAction, useCallback, useContext, useEffect } from "react"
import '../../styles/sidebar.scss'
import { useDeleteNoteMutation } from "../../services/notesApi"
import { CustomContext } from "../../context/UserContext"

interface SidebarNoteMenuProps {
	x: number
	y: number
	showMenu: boolean
	setShowMenu: Dispatch<SetStateAction<boolean>>
	noteId: number
}

const SidebarNoteMenu: FC<SidebarNoteMenuProps> = ({ x, y, showMenu, setShowMenu, noteId}) => {
	
	const {user} = useContext(CustomContext)
	const [deleteNote, {}] = useDeleteNoteMutation()

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
			<button onClick={() => deleteNote({userId: String(user.user.id), noteId: String(noteId)})}>Удалить</button>
		</div>
	)
}

export default SidebarNoteMenu