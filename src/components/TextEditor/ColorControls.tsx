import { EditorState } from "draft-js"
import { IColor } from "./editorSettings"
import { FC } from "react"

interface ColorControlsProps {
	editorState: EditorState
	onColorToggle: (color: string) => void
	colors: IColor[]
}

const ColorControls: FC<ColorControlsProps> = ({editorState, onColorToggle, colors}) => {


	return (
		<div>
			
		</div>
	)
}

export default ColorControls