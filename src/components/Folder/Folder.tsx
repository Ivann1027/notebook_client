import { FolderT } from "../../types/types"
import { ChangeEvent, MouseEventHandler, useState, KeyboardEvent, useContext } from "react"
import '../../styles/folder.scss'
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa"
import FolderMenu from "./FolderMenu"
import { useRenameFolderMutation } from "../../services/foldersApi"
import { CustomContext } from "../../context/UserContext"
import SidebarNote from "../Note/SidebarNote"

interface FolderProps {
	folder: FolderT
}

const Folder: React.FC<FolderProps> = ({ folder }) => {

	const {user} = useContext(CustomContext)
	const [renameFolder, {}] = useRenameFolderMutation()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
	const [isRenaming, setIsRenaming] = useState<boolean>(false)
	const [newName, setNewName] = useState<string>(folder.name)

	const handleContextMenu: MouseEventHandler = (e) => {
		e.preventDefault()
		if (e.button == 2) {
			setMenuPosition({ x: e.clientX, y: e.clientY })
			setShowMenu(!showMenu)
		}
	}

	const saveNewName = () => {
		renameFolder({userId: String(user.user.id), folderId: String(folder.id), name: newName})
		setIsRenaming(false)
	}

	const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (isRenaming && e.key === 'Enter') saveNewName()
	}
	
	const folderOpen = (folder: FolderT) => {
		setIsOpen(!isOpen)
		console.log(folder)
	}

	return (
		<div className="folder">
			<div onClick={() => folderOpen(folder)} onContextMenu={handleContextMenu} className="folder__name">
				{showMenu && <FolderMenu x={menuPosition.x} y={menuPosition.y} showMenu={showMenu} setShowMenu={setShowMenu} setIsRenaming={setIsRenaming} userId={user.user.id} folderId={folder.id} />}
				<span className="folder__icon">{isOpen ? (<FaRegFolderOpen />) : (<FaRegFolder />)}</span>
				{isRenaming ? (
					<input onKeyDown={handleKeyEnter} value={newName} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)} className="folder__renaming" />
				) : (
					<span>{folder.name}</span>
				)}
			</div>
			{isOpen && <ul className="folder__notes">
				{folder.notes && folder.notes.map(note => (
					<SidebarNote note={note} key={note.id} />
				))}
			</ul>}
		</div>
	)
}

export default Folder