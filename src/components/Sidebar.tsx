import { ChangeEvent, MouseEventHandler, useContext, useState, KeyboardEvent } from 'react'
import '../styles/sidebar.scss'
import Folder from './Folder/Folder'
import { CustomContext } from '../context/UserContext'
import { LogoutBtn } from './UI/LogoutBtn/LogoutBtn'
import AllNotes from './Note/AllNotes'
import { useCreateFolderMutation, useGetAllFoldersQuery } from '../services/foldersApi'
import SidebarMenu from './SidebarMenu'

function Sidebar() {

	const {user, setUser, emptyUser} = useContext(CustomContext)
	const {data: folders} = useGetAllFoldersQuery(String(user.user.id))
	const [createFolder, {}] = useCreateFolderMutation()
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
	const [newFolder, setNewFolder] = useState<string>('')
	const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false)

	const logout = () => {
		localStorage.removeItem('currentUser')
		setUser(emptyUser)
	}

	const handleContextMenu: MouseEventHandler = (e) => {
		e.preventDefault()
		if (e.button == 2) {
			setMenuPosition({ x: e.clientX, y: e.clientY })
			setShowMenu(!showMenu)
		}
	}

	const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && isAddingFolder) {
			createFolder({userId: String(user.user.id), name: newFolder})
			setIsAddingFolder(false)
		}
	}

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<h3 className='sidebar__name'>{user.user.name}</h3>
				<LogoutBtn onClick={logout} />
			</div>
			<div className="sidebar__body">
				{showMenu && <SidebarMenu x={menuPosition.x} y={menuPosition.y} showMenu={showMenu} setShowMenu={setShowMenu} userId={user.user.id} setIsAddingFolder={setIsAddingFolder} />}
				<AllNotes />
				<div onContextMenu={handleContextMenu} className='sidebar__folders'>
					{folders && folders.map(folder => (
						<Folder key={folder.id} folder={folder} />
					))}
					{isAddingFolder && <input onKeyDown={handleKeyEnter} value={newFolder} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewFolder(e.target.value)} className='sidebar__newFolder' />}
				</div>
			</div>
		</div>
	)
}

export default Sidebar