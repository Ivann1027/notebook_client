import { EditorState } from "draft-js"
import { FC } from "react"
import { TControllStyles } from "./editorSettings"
import ControlItem from "./ControlItem"

interface InlineControlsProps {
	editorState: EditorState
	onInlineToggle: (inlineStyle: string) => void
	inlineStyles: TControllStyles[]
}

const InlineControls: FC<InlineControlsProps> = ({ editorState, onInlineToggle, inlineStyles }) => {
	
	const currentStyle = editorState.getCurrentInlineStyle()

	return (
		<div className="RichEditor-controls">
			{inlineStyles.map(type => (
				<ControlItem isActive={currentStyle.has(type.style)} onToggle={onInlineToggle} style={type.style} key={type.label}>
					{type.label}
				</ControlItem>
			))}
		</div>
	)
}

export default InlineControls