import { FC, MouseEventHandler, useState } from 'react'
import '../../styles/sidebar.scss'
import { NoteT } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { IoDocumentTextOutline } from "react-icons/io5"
import SidebarNoteMenu from './SidebarNoteMenu'

interface SidebarNoteProps {
	note: NoteT
	folderNote: boolean
	folderId: string
}

const SidebarNote: FC<SidebarNoteProps> = ({ note, folderNote, folderId }) => {
	
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
		<li onClick={() => navigate(`notes/${note.id}`, {state: {note}})} onContextMenu={handleContext} className={`sidebar__note ${folderNote ? ' folder-note' : ''}`}>
			{showMenu && <SidebarNoteMenu x={menuPosition.x} y={menuPosition.y} showMenu={showMenu} setShowMenu={setShowMenu} note={note} folderId={folderId} />}
			<span className='sidebar__note-icon'><IoDocumentTextOutline /></span>
			{note.title}
		</li>
	)
}

export default SidebarNote