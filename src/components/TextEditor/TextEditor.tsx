import { DraftBlockType, Editor, EditorState, RichUtils } from "draft-js"
import 'draft-js/dist/Draft.css'
import { useState } from "react"
import BlockControls from "./BlockControls"
import { BLOCK_TYPES, INLINE_STYLES } from "./editorSettings"
import InlineControls from "./InlineControls"

const TextEditor = () => {

	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const onChange = (newEditorState: EditorState) => setEditorState(newEditorState)

	const handleKeyCommand = (command: string, editorState: EditorState): 'handled' | 'not-handled' => {
		const newState = RichUtils.handleKeyCommand(editorState, command)
		if (newState) {
			onChange(newState)
			return 'handled'
		}
		return 'not-handled'
	}

	const toggleBlockType = (blockType: DraftBlockType) => {
		onChange(RichUtils.toggleBlockType(editorState, blockType))
	}
	const toggleInlineType = (inlineType: string) => {
		onChange(RichUtils.toggleInlineStyle(editorState, inlineType))
	}

	return (
		<div>
			<BlockControls editorState={editorState} onBlockToggle={toggleBlockType} blockTypes={BLOCK_TYPES} />
			<InlineControls editorState={editorState} onInlineToggle={toggleInlineType} inlineStyles={INLINE_STYLES} />
			<Editor editorState={editorState} onChange={onChange} handleKeyCommand={handleKeyCommand} />
		</div>
	)
}

export default TextEditor