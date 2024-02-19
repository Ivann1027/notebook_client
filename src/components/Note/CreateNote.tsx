import TextEditor from "../TextEditor/TextEditor"
import { ChangeEvent, useState } from "react"
import '../../styles/noteForm.scss'

const CreateNote = () => {

	const [title, setTitle] = useState<string>('')

	return (
		<div>
			<div className="noteTitle">
				<input value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder="Название..." type='text' /> 
			</div>
			<TextEditor />
		</div>
	)
}

export default CreateNote