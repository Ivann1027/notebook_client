import { useNavigate, useParams } from "react-router-dom"
import { NoteT } from "../../types/types"
import { useGetNoteQuery } from "../../services/notesApi"
import { useContext, useEffect } from "react"
import { CustomContext } from "../../context/UserContext"
import '../../styles/notePage.scss'
import { ContentState, convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"


const Note = () => {

	const { noteId } = useParams()
	const { user } = useContext(CustomContext)
	const { data: note } = useGetNoteQuery({ userId: String(user.user.id), noteId: String(noteId) })
	const navigate = useNavigate()

	useEffect(() => {
		if (note) {
			const savedContent = note.content
			const contentState: ContentState = convertFromRaw(JSON.parse(savedContent as string))
			const html = stateToHTML(contentState)
			const noteContent = document.getElementById('note-content')
			if (noteContent) {
				noteContent.innerHTML = html
			}
		}
	}, [note])


	return (
		<div className="note">
			<h2 className="note__title">{note?.title}</h2>
			<div className="note__content" id="note-content">

			</div>
		</div>
	)
}

export default Note