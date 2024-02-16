import { FC, MouseEventHandler, useState } from 'react'
import '../../styles/sidebar.scss'
import { NoteT } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { IoDocumentTextOutline } from "react-icons/io5"
import SidebarNoteMenu from './SidebarNoteMenu'

interface SidebarNoteProps {
	note: NoteT
}

const SidebarNote: FC<SidebarNoteProps> = ({ note }) => {
	
	const navigate = useNavigate()
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

	const handleContext: MouseEventHandler = (e) => {
		e.preventDefault()
		if (e.button == 2) {
			setMenuPosition({ x: e.clientX, y: e.clientY })
			setShowMenu(!showMenu)
		}
	}

	return (
		<li onClick={() => navigate(`notes/${note.id}`)} onContextMenu={handleContext} className="sidebar__note">
			{showMenu && <SidebarNoteMenu x={menuPosition.x} y={menuPosition.y} showMenu={showMenu} setShowMenu={setShowMenu} noteId={note.id} />}
			<span className='sidebar__note-icon'><IoDocumentTextOutline /></span>
			{note.title}
		</li>
	)
}

export default SidebarNote