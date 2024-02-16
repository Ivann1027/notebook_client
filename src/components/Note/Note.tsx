import { useNavigate, useParams } from "react-router-dom"
import { NoteT } from "../../types/types"
import { useGetNoteQuery } from "../../services/notesApi"
import { useContext } from "react"
import { CustomContext } from "../../context/UserContext"


const Note = () => {

	const { noteId } = useParams()
	const { user } = useContext(CustomContext)
	const {data: note} = useGetNoteQuery({userId: String(user.user.id), noteId: String(noteId)})
	const navigate = useNavigate()


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