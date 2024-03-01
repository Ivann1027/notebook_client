import { ContentState, EditorState, convertFromRaw, convertToRaw } from "draft-js"
import TextEditor from "../TextEditor/TextEditor"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import '../../styles/noteForm.scss'
import { useUpdateNoteMutation } from "../../services/notesApi"
import { CustomContext } from "../../context/UserContext"

const EditNote = () => {

	const [updateNote, { }] = useUpdateNoteMutation()
	const {user} = useContext(CustomContext)
	const location = useLocation()
	const { note } = location.state
	const [editorState, setEditorState] = useState<EditorState | null | undefined>(null)
	const [title, setTitle] = useState<string>(note.title) 
	const [isEditing, setIsEditing] = useState<boolean>(true)

	const handleEditorStateChange = (newEditorState: EditorState) => {
		setEditorState(newEditorState)
	}

	useEffect(() => {
		const contentState: ContentState = convertFromRaw(JSON.parse(note.content))
		setEditorState(EditorState.createWithContent(contentState))
	}, [])

	const handleUpdateNote = async () => {
		const contentState = editorState?.getCurrentContent()
		const content = JSON.stringify(convertToRaw(contentState as ContentState))
		await updateNote({userId: String(user.user.id), noteId: String(note.id), updatedData: {title: title, content: content}})
	}

	return (
		<div className="noteForm">
			<div className="noteForm__buttons">
				<button onClick={handleUpdateNote}>Сохранить</button>
			</div>
			<div className="noteForm__title">
				<input value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder="Название..." />
			</div>
			<TextEditor onEditorStateChange={handleEditorStateChange} isEditing={isEditing} setIsEditing={setIsEditing} initialEditorState={editorState} />
		</div>
	)
}

export default EditNote