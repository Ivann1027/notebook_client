import { ContentBlock, DraftBlockType, Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding } from "draft-js"
import 'draft-js/dist/Draft.css'
import './editorStyles/editorStyles.css'
import './editorStyles/editorStyleMap.scss'
import { FC, useState, KeyboardEvent, useEffect, Dispatch, SetStateAction } from "react"
import BlockControls from "./BlockControls"
import { BLOCK_TYPES, INLINE_STYLES, TEXT_COLORS } from "./editorSettings"
import InlineControls from "./InlineControls"
import ColorControls from "./ColorControls"

interface TextEditorProps {
	onEditorStateChange: (editorState: EditorState) => void
	isEditing?: boolean
	setIsEditing?: Dispatch<SetStateAction<boolean>>
	initialEditorState?: EditorState | undefined | null
}

const TextEditor: FC<TextEditorProps> = ({onEditorStateChange, isEditing, setIsEditing, initialEditorState}) => {

	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const onChange = (newEditorState: EditorState) => {
		setEditorState(newEditorState)
		onEditorStateChange(newEditorState)
	}

	useEffect(() => {
		if (isEditing && initialEditorState && setIsEditing) {
			console.log(typeof isEditing)
			console.log(typeof initialEditorState)
			onChange(initialEditorState)
			setIsEditing(false)
		}
	}, [initialEditorState, isEditing])

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
	const toggleColor = (color: string) => {
		onChange(RichUtils.toggleInlineStyle(editorState, `COLOR-${color.toUpperCase()}`))
	}

	return (
		<div>
			<BlockControls editorState={editorState} onBlockToggle={toggleBlockType} blockTypes={BLOCK_TYPES} />
			<InlineControls editorState={editorState} onInlineToggle={toggleInlineType} inlineStyles={INLINE_STYLES} />
			<ColorControls editorState={editorState} onColorToggle={toggleColor} colors={TEXT_COLORS} />
			<Editor editorState={editorState} onChange={onChange} handleKeyCommand={handleKeyCommand} keyBindingFn={keyBindingFn} />
		</div>
	)
}

export default TextEditor