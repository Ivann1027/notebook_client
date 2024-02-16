import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react'
import '../../styles/folder.scss'
import { useDeleteFolderMutation } from '../../services/foldersApi'

interface FolderMenuProps {
	x: number
	y: number
	showMenu: boolean
	setShowMenu: Dispatch<SetStateAction<boolean>>
	setIsRenaming: Dispatch<SetStateAction<boolean>>
	userId: number
	folderId: number
}

const FolderMenu: FC<FolderMenuProps> = ({ x, y, showMenu, setShowMenu, setIsRenaming, userId, folderId }) => {

	const [deleteFolder, {}] = useDeleteFolderMutation()
	
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
		<div style={{top: y, left: x}} className="folderMenu">
			<button onClick={() => setIsRenaming(true)}>Переименовать</button>
			<button onClick={() => deleteFolder({userId: String(userId), folderId: String(folderId)})} type='button'>Удалить</button>
		</div>
	)
}

export default FolderMenu