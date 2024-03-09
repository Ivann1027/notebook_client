import { FC, useContext } from "react"
import { CustomContext } from "../../context/UserContext"
import { useGetAllFoldersQuery } from "../../services/foldersApi"
import { FolderT } from "../../types/types"
import '../../styles/sidebar.scss'
import { useAddNoteToFolderMutation } from "../../services/foldersApi"

interface AddNoteToFolderProps {
	isVisible: boolean
	noteId: string
}

const AddNoteToFolder: FC<AddNoteToFolderProps> = ({isVisible, noteId}) => {

	const {user} = useContext(CustomContext)
	const { data: folders } = useGetAllFoldersQuery(String(user.user.id))
	const [addNoteToFolder, {}] = useAddNoteToFolderMutation()
	
	const handleAddingNote = (folderId: string) => {
		addNoteToFolder({userId: String(user.user.id), folderId: folderId, noteId: noteId})
	}

	return (
		<div className="addNoteToFolder" style={{display: isVisible ? 'block' : 'none'}} id="open-folders">
			{folders && folders.map((folder: FolderT) => (
				<div onClick={() => handleAddingNote(String(folder.id))} key={folder.id}>{folder.name}</div>
			))}
		</div>
	)
}

export default AddNoteToFolder