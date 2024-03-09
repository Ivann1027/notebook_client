import { Dispatch, FC, MouseEvent, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import '../../styles/sidebar.scss'
import { useDeleteNoteMutation } from "../../services/notesApi"
import { CustomContext } from "../../context/UserContext"
import { useDeleteNoteFromFolderMutation } from "../../services/foldersApi"
import { useNavigate } from "react-router-dom"
import { NoteT } from "../../types/types"
import AddNoteToFolder from "./AddNoteToFolder"
import { FaChevronRight } from "react-icons/fa"

interface SidebarNoteMenuProps {
	x: number
	y: number
	showMenu: boolean
	setShowMenu: Dispatch<SetStateAction<boolean>>
	note: NoteT
	folderId?: string
}

const SidebarNoteMenu: FC<SidebarNoteMenuProps> = ({ x, y, showMenu, setShowMenu, note, folderId}) => {
	
	const navigate = useNavigate()
	const {user} = useContext(CustomContext)
	const [deleteNote, { }] = useDeleteNoteMutation()
	const [deleteNoteFromFolder, { }] = useDeleteNoteFromFolderMutation() 
	const [areFoldersOpen, setAreFoldersOpen] = useState<boolean>(false)
	const [isMouseOver, setIsMouseOver] = useState<boolean>(false)
	const timerRef = useRef<number>()

	const openFolders = () => {
		setAreFoldersOpen(true)
		clearTimeout(timerRef.current)
	}
	const closeFolders = () => {
		timerRef.current = window.setTimeout(() => setAreFoldersOpen(false), 100)
	}

	const closeMenu = useCallback(() => {
		if (showMenu) setShowMenu(false)
	}, [])
	
	useEffect(() => {
		document.addEventListener('click', closeMenu)
		return () => {
			document.removeEventListener('click', closeMenu)
		}
	}, [closeMenu, showMenu])

	const handleEditNote = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		navigate(`/notes/${note.id}/edit`, { state: { note } })
		setShowMenu(false)
	}

	return (
		<div style={{ top: y, left: x }} className="sidebar__menu">
			<button onMouseEnter={openFolders} onMouseLeave={closeFolders} style={{ position: 'relative' }}>
				<span>Добавить в папку <FaChevronRight /></span> <AddNoteToFolder isVisible={areFoldersOpen} noteId={String(note.id)} />
			</button>
			<button onClick={handleEditNote}>Редактировать</button>
			<button onClick={() => deleteNote({ userId: String(user.user.id), noteId: String(note.id) })}>Удалить</button>
			{folderId && (
				<button onClick={() => deleteNoteFromFolder({ userId: String(user.user.id), folderId: folderId, noteId: String(note.id) })}>Удалить из папки</button>
			)}
		</div>
	)
}

export default SidebarNoteMenu