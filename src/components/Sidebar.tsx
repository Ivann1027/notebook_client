import { useContext } from 'react'
import '../styles/main.scss'
import { FolderT } from '../types/types'
import Folder from './Folder'
import { CustomContext } from '../context/UserContext'
import { LogoutBtn } from './UI/LogoutBtn/LogoutBtn'
import AllNotes from './AllNotes'
import { useGetAllFoldersQuery } from '../services/foldersApi'

function Sidebar() {

	const {user, setUser, emptyUser} = useContext(CustomContext)
	const {data: folders} = useGetAllFoldersQuery(String(user.user.id))

	const logout = () => {
		localStorage.removeItem('currentUser')
		setUser(emptyUser)
	}

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<h3 className='sidebar__name'>{user.user.name}</h3>
				<LogoutBtn onClick={logout} />
			</div>
			<div className="sidebar__body">
				<AllNotes />
				{folders && folders.map(folder => (
					<Folder key={folder.id} folder={folder} />
				))}
			</div>
		</div>
	)
}

export default Sidebar