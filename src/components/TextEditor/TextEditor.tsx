import { ContentBlock, DraftBlockType, Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding } from "draft-js"
import 'draft-js/dist/Draft.css'
import './editorStyles/editorStyles.css'
import './editorStyles/editorStyleMap.scss'
import { FC, useState, KeyboardEvent } from "react"
import BlockControls from "./BlockControls"
import { BLOCK_TYPES, INLINE_STYLES } from "./editorSettings"
import InlineControls from "./InlineControls"

interface TextEditorProps {
	onEditorStateChange: (editorState: EditorState) => void
}

const TextEditor: FC<TextEditorProps> = ({onEditorStateChange}) => {

	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const onChange = (newEditorState: EditorState) => {
		setEditorState(newEditorState)
		onEditorStateChange(newEditorState)
	}

	const handleKeyCommand = (command: string, editorState: EditorState): 'handled' | 'not-handled' => {
		if (command === 'soft-newline') {
			onChange(RichUtils.insertSoftNewline(editorState))
			return 'handled'
		} else if (command === 'split-block') {	
			const newContentState = Modifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection())
			const newState = EditorState.push(editorState, newContentState, 'split-block')
			const newStateWithoutStyle = RichUtils.toggleBlockType(newState, 'unstyled')
			onChange(newStateWithoutStyle)
			return 'handled'
		}
		return 'not-handled'
	}

	const keyBindingFn = (e: KeyboardEvent): string | null => {
		if (e.key === 'Enter' && !e.shiftKey) {
			return 'split-block'
		} else if (e.key === 'Enter' && e.shiftKey) {
			return 'soft-newline'
		}
		return getDefaultKeyBinding(e)
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
			<Editor editorState={editorState} onChange={onChange} handleKeyCommand={handleKeyCommand} keyBindingFn={keyBindingFn} />
		</div>
	)
}

export default TextEditor