import TextEditor from "../TextEditor/TextEditor"
import { ChangeEvent, useState, MouseEvent, useContext } from "react"
import '../../styles/noteForm.scss'
import { ContentState, EditorState, convertToRaw } from "draft-js"
import { CustomContext } from "../../context/UserContext"
import { useCreateNoteMutation } from "../../services/notesApi"

const CreateNote = () => {

	const { user } = useContext(CustomContext)
	const [createNote, {}] = useCreateNoteMutation()
	const [title, setTitle] = useState<string>('')
	const [editorState, setEditorState] = useState<EditorState | null>(null)

	const handleEditorStateChange = (newEditorState: EditorState) => {
		setEditorState(newEditorState)
	}

	const handleClickCreate = async () => {
		const contentState = editorState?.getCurrentContent()
		const content = JSON.stringify(convertToRaw(contentState as ContentState))
		await createNote({userId: String(user.user.id), title: title, content: content})
	}

	return (
		<div className="noteForm">
			<div className="noteForm__buttons">
				<button onClick={handleClickCreate} type="button">Создать</button>
			</div>
			<div className="noteForm__title">
				<input value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder="Название..." type='text' /> 
			</div>
			<TextEditor onEditorStateChange={handleEditorStateChange} />
		</div>
	)
}

export default CreateNote