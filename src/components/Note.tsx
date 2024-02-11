import { useNavigate, useParams } from "react-router-dom"
import { NoteT } from "../types/types"
import { useGetNoteQuery } from "../services/notesApi"


const Note = () => {

	const { noteId } = useParams()
	const {data: note} = useGetNoteQuery({userId: String(3), noteId: String(noteId)})
	const navigate = useNavigate()

	console.log(note)

	return (
		<div>
			{note && 
				<>
					<h1>{note.title}</h1>
					<p>{note.content}</p>
				</>
			}
		</div>
	)
}

export default Note