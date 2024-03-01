import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import '../../styles/notePage.scss'
import '../../styles/noteStyleMap.scss'
import { ContentState, convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"


const Note = () => {

	const location = useLocation()
	const { note } = location.state

	useEffect(() => {
		if (note) {
			const contentState: ContentState = convertFromRaw(JSON.parse(note.content))
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