import { DraftBlockType, EditorState } from "draft-js"
import { FC } from "react"
import { TControllStyles } from "./editorSettings"
import ControlItem from "./ControlItem"

interface BlockControlsProps {
	editorState: EditorState
	onBlockToggle: (blockStyle: DraftBlockType) => void
	blockTypes: TControllStyles[]
}

const BlockControls: FC<BlockControlsProps> = ({editorState, onBlockToggle, blockTypes}) => {

	const selection = editorState.getSelection()
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType()

	return (
		<div className="RichEditor-controls">
			{blockTypes.map(type => (
				<ControlItem isActive={type.style === blockType} onToggle={onBlockToggle} style={type.style} key={type.label}>
					{type.label}
				</ControlItem>
			))}
		</div>
	)
}

export default BlockControls