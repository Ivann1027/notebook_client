import { ContentBlock, DraftBlockType, DraftHandleValue, Editor, EditorState, RichUtils } from "draft-js"
import 'draft-js/dist/Draft.css'
import './editorStyles/editorStyles.css'
import './editorStyles/styleMap.css'
import { FC, useState } from "react"
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

	const blockStyleFn = (contentBlock: ContentBlock) => {
		const type = contentBlock.getType()
		if (type === 'blockquote') return 'customBlockqoute'
		if (type === 'code-block') return 'customCodeBlock'
		return ''
	}

	return (
		<div>
			<BlockControls editorState={editorState} onBlockToggle={toggleBlockType} blockTypes={BLOCK_TYPES} />
			<InlineControls editorState={editorState} onInlineToggle={toggleInlineType} inlineStyles={INLINE_STYLES} />
			<Editor editorState={editorState} onChange={onChange} handleKeyCommand={handleKeyCommand} blockStyleFn={blockStyleFn} />
		</div>
	)
}

export default TextEditor