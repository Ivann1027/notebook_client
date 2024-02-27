import { EditorState, convertFromRaw } from "draft-js"
import TextEditor from "../TextEditor/TextEditor"
import { ChangeEvent, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import '../../styles/noteForm.scss'

const EditNote = () => {

	const location = useLocation()
	const { note } = location.state
	const [editorState, setEditorState] = useState<EditorState | null>(null)
	const [title, setTitle] = useState<string>(note.title) 

	const handleEditorStateChange = (newEditorState: EditorState) => {
		setEditorState(newEditorState)
	}

	console.log(note)

	useEffect(() => {
		const contentState = convertFromRaw(note.content)
		setEditorState(EditorState.createWithContent(contentState))
	}, [])


	return (
		<div className="noteForm">
			<div className="noteForm__buttons">
				<button>Сохранить</button>
			</div>
			<div className="noteForm__title">
				<input value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder="Название..." />
			</div>
			<TextEditor onEditorStateChange={handleEditorStateChange} />
		</div>
	)
}

export default EditNote