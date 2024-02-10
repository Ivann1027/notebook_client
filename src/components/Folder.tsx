import { FolderT } from "../types/types"
import { useState } from "react"

interface FolderProps {
	folder: FolderT
}

const Folder: React.FC<FolderProps> = ({ folder }) => {

	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div onClick={() => setIsOpen(!isOpen)}>
			<p>{folder.name}</p>
			{isOpen && <ul>
				{folder.notes && folder.notes.map(note => (
					<li key={note.id}>{note.title}</li>
				))}
			</ul>}
		</div>
	)
}

export default Folder